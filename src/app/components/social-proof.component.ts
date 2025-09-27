import { Component, ChangeDetectionStrategy, input, output, signal, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Testimonial, Award, FaqItem } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [AnimateOnScrollDirective, NgOptimizedImage, HighlightPipe],
  templateUrl: './social-proof.component.html',
  styleUrls: ['./social-proof.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialProofComponent {
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  // --- Component Inputs & Outputs ---
  testimonials = input.required<Testimonial[]>();
  awards = input.required<Award[]>();
  faqs = input.required<FaqItem[]>();
  openFaqQuestion = input.required<string | null>();

  showTestimonials = input(true);
  showAwards = input(true);
  showFaqs = input(true);

  toggleFaq = output<string>();

  // --- Animation Duration Logic for Marquee ---
  animationDuration = computed(() => {
    const count = this.testimonials().length;
    // Calculate a duration of 5 seconds per card
    const duration = count * 5; 
    return `${Math.max(20, duration)}s`; // Ensure a minimum duration
  });
  
  // --- FAQ State & Logic ---
  searchTerm = signal('');
  activeFaqCategory = signal('All');

  faqCategories = computed(() => {
    const categories = this.faqs().map(faq => faq.category);
    return ['All', ...new Set(categories)];
  });

  displayedFaqs = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.activeFaqCategory();
    const allFaqs = this.faqs();
    
    const showPopularSection = category === 'All' && !term;

    if (showPopularSection) {
      const popular = allFaqs.filter(faq => faq.isPopular);
      const others = allFaqs.filter(faq => !faq.isPopular);
      return {
        popular,
        others,
        hasResults: true,
      };
    }

    let filtered = allFaqs;
    if (category !== 'All') {
      filtered = filtered.filter(faq => faq.category === category);
    }
    
    if (term) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(term) || 
        faq.answer.toLowerCase().includes(term)
      );
    }

    return {
      popular: [],
      others: filtered,
      hasResults: filtered.length > 0,
    };
  });
  
  onSearchTermChange(event: Event): void {
      const term = (event.target as HTMLInputElement).value;
      this.searchTerm.set(term);
  }

  onCategoryChange(category: string): void {
    this.activeFaqCategory.set(category);
  }
}
