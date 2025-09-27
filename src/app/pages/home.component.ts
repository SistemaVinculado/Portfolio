import { Component, ChangeDetectionStrategy, signal, inject, Renderer2, effect, PLATFORM_ID, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BlogPost, PortfolioItem } from '../models';
import { DataService } from '../data.service';
import { LanguageService } from '../services/language.service';

// Component Imports
import { IntroComponent } from '../components/intro.component';
import { SocialProofComponent } from '../components/social-proof.component';
import { ActionZoneComponent } from '../components/action-zone.component';
import { PortfolioModalComponent } from '../components/portfolio-modal.component';
import { BlogModalComponent } from '../components/blog-modal.component';
import { VisitorGlobeComponent } from '../components/visitor-globe.component';
import { AvailabilityMarqueeComponent } from '../components/availability-marquee.component';
import { SectionDividerComponent } from '../components/section-divider.component';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../pipes/translate.pipe';
import { ScrollspyNavComponent } from '../components/scrollspy-nav.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    AnimateOnScrollDirective,
    IntroComponent,
    SocialProofComponent,
    ActionZoneComponent,
    PortfolioModalComponent,
    BlogModalComponent,
    VisitorGlobeComponent,
    AvailabilityMarqueeComponent,
    SectionDividerComponent,
    TranslatePipe,
    ScrollspyNavComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private document: Document = inject(DOCUMENT);
  private dataService: DataService = inject(DataService);
  private languageService = inject(LanguageService);
  
  openFaqQuestion = signal<string | null>(null);
  selectedPortfolioItem = signal<PortfolioItem | null>(null);
  selectedBlogPost = signal<BlogPost | null>(null);
  showVisitorGlobe = signal(false);
  contactFormMessage = signal<string | null>(null);

  constructor() {
    // Combined effect for managing body scroll lock for modals
    effect(() => {
        if (isPlatformBrowser(this.platformId)) {
            const shouldLock = !!this.selectedPortfolioItem() || !!this.selectedBlogPost() || this.showVisitorGlobe();
            if (shouldLock) {
                this.renderer.addClass(this.document.body, 'overflow-hidden');
            } else {
                this.renderer.removeClass(this.document.body, 'overflow-hidden');
            }
        }
    });

    // Effect for handling Escape key to close any open modal
    effect((onCleanup) => {
        const isModalOpen = !!this.selectedPortfolioItem() || !!this.selectedBlogPost() || this.showVisitorGlobe();
        if (isModalOpen) {
            const escapeListener = this.renderer.listen('document', 'keydown.escape', () => {
                this.closePortfolioModal();
                this.closeBlogModal();
                this.closeVisitorGlobe();
            });
            onCleanup(() => {
                escapeListener();
            });
        }
    });
  }

  // Data signals from DataService
  clients = this.dataService.clients;
  stats = this.dataService.stats;
  services = this.dataService.services;
  portfolioItems = this.dataService.portfolioItems;
  testimonials = this.dataService.testimonials;
  awards = this.dataService.awards;
  faqs = this.dataService.faqs;

  scrollSpyNavLinks = computed(() => [
    { label: this.languageService.get('home.servicesOverview.title')(), href: '#services-overview' },
    { label: this.languageService.get('home.featuredWork.title')(), href: '#featured-work' },
    { label: this.languageService.get('home.socialProof.testimonialsTitle')(), href: '#social-proof' },
    { label: this.languageService.get('home.actionZone.pricingTitle')(), href: '#pricing' },
    { label: this.languageService.get('components.contact.title')(), href: '#contact' }
  ]);
  
  toggleFaq(question: string): void {
    this.openFaqQuestion.update(currentQuestion => currentQuestion === question ? null : question);
  }

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = this.document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  handleScrollToWithMessage(payload: { event: Event; href: string; message?: string }): void {
    this.scrollTo(payload.event, payload.href);
    this.contactFormMessage.set(payload.message ?? null);
  }
  
  openPortfolioModal(item: PortfolioItem): void { this.selectedPortfolioItem.set(item); }
  closePortfolioModal(): void { this.selectedPortfolioItem.set(null); }
  openBlogModal(post: BlogPost): void { this.selectedBlogPost.set(post); }
  closeBlogModal(): void { this.selectedBlogPost.set(null); }
  openVisitorGlobe(): void { this.showVisitorGlobe.set(true); }
  closeVisitorGlobe(): void { this.showVisitorGlobe.set(false); }
}
