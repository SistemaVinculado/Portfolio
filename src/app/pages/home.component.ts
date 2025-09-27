import { Component, ChangeDetectionStrategy, signal, inject, Renderer2, effect, PLATFORM_ID, computed, OnInit } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BlogPost, PortfolioItem } from '../models';
import { DataService } from '../data.service';

// Component Imports
import { IntroComponent } from '../components/intro.component';
import { PhilosophyComponent } from '../components/philosophy.component';
import { StellarDevEthosComponent } from '../components/stellardev-ethos.component';
import { FeaturesComponent } from '../components/features.component';
import { WorkComponent } from '../components/work.component';
import { SecurityDashboardComponent } from '../components/security-dashboard.component';
import { CommunityComponent } from '../components/community.component';
import { SocialProofComponent } from '../components/social-proof.component';
import { ActionZoneComponent } from '../components/action-zone.component';
import { PortfolioModalComponent } from '../components/portfolio-modal.component';
import { BlogModalComponent } from '../components/blog-modal.component';
import { VisitorGlobeComponent } from '../components/visitor-globe.component';
import { AvailabilityMarqueeComponent } from '../components/availability-marquee.component';
import { ScrollspyNavComponent } from '../components/scrollspy-nav.component';
import { SectionDividerComponent } from '../components/section-divider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IntroComponent,
    PhilosophyComponent,
    StellarDevEthosComponent,
    FeaturesComponent,
    WorkComponent,
    SecurityDashboardComponent,
    CommunityComponent,
    SocialProofComponent,
    ActionZoneComponent,
    PortfolioModalComponent,
    BlogModalComponent,
    VisitorGlobeComponent,
    AvailabilityMarqueeComponent,
    ScrollspyNavComponent,
    SectionDividerComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private document: Document = inject(DOCUMENT);
  private dataService: DataService = inject(DataService);
  
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
  navLinks = this.dataService.navLinks;
  clients = this.dataService.clients;
  stats = this.dataService.stats;
  philosophyPrinciples = this.dataService.philosophyPrinciples;
  stellarDevEthos = this.dataService.stellarDevEthos;
  services = this.dataService.services;
  engagementModels = this.dataService.engagementModels;
  technologies = this.dataService.technologies;
  portfolioItems = this.dataService.portfolioItems;
  processSteps = this.dataService.processSteps;
  teamMembers = this.dataService.teamMembers;
  jobOpenings = this.dataService.jobOpenings;
  labExperiments = this.dataService.labExperiments;
  blogPosts = this.dataService.blogPosts;
  testimonials = this.dataService.testimonials;
  awards = this.dataService.awards;
  faqs = this.dataService.faqs;

  activePortfolioCategory = signal<string>('All');
  
  portfolioCategories = computed(() => {
    const categories = this.portfolioItems().map(item => item.category);
    return ['All', ...new Set(categories)];
  });

  filteredPortfolioItems = computed(() => {
    const category = this.activePortfolioCategory();
    if (category === 'All') {
      return this.portfolioItems();
    }
    return this.portfolioItems().filter(item => item.category === category);
  });

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
  
  onPortfolioFilterChange(category: string): void {
    this.activePortfolioCategory.set(category);
  }

  openPortfolioModal(item: PortfolioItem): void { this.selectedPortfolioItem.set(item); }
  closePortfolioModal(): void { this.selectedPortfolioItem.set(null); }
  openBlogModal(post: BlogPost): void { this.selectedBlogPost.set(post); }
  closeBlogModal(): void { this.selectedBlogPost.set(null); }
  openVisitorGlobe(): void { this.showVisitorGlobe.set(true); }
  closeVisitorGlobe(): void { this.showVisitorGlobe.set(false); }
}