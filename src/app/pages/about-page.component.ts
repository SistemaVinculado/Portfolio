import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '../data.service';
import { NgOptimizedImage } from '@angular/common';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { PhilosophyComponent } from '../components/philosophy.component';
import { WorkComponent } from '../components/work.component';
import { SocialProofComponent } from '../components/social-proof.component';
import { SectionDividerComponent } from '../components/section-divider.component';
import { CtaComponent } from '../components/cta.component';
import { Router } from '@angular/router';
import { TextContentService } from '../services/text-content.service';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    PhilosophyComponent,
    WorkComponent,
    SocialProofComponent,
    SectionDividerComponent,
    CtaComponent,
    NgOptimizedImage,
    AnimateOnScrollDirective
  ],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private textContentService: TextContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }

  // Page Header Content
  pageTitle = this.textContentService.get('pages.about.title');
  pageSubtitle = this.textContentService.get('pages.about.subtitle');

  // Data signals from DataService
  philosophyPrinciples = this.dataService.philosophyPrinciples;
  processSteps = this.dataService.processSteps;
  teamMembers = this.dataService.teamMembers;
  awards = this.dataService.awards;
  
  dummyPortfolioItems = this.dataService.portfolioItems; 
  dummyCategories = ['All'];
  dummyActiveCategory = 'All';
  dummyTestimonials = this.dataService.testimonials;
  dummyFaqs = this.dataService.faqs;
  dummyOpenFaqQuestion = null;
  
  onScrollTo(payload: { event: Event; href: string }): void {
    payload.event.preventDefault();
    this.router.navigate(['/contact']);
  }
}
