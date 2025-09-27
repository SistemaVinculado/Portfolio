import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { PortfolioItem } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { WorkComponent } from '../components/work.component';
import { PortfolioModalComponent } from '../components/portfolio-modal.component';
import { CtaComponent } from '../components/cta.component';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';


@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [PageHeaderComponent, WorkComponent, PortfolioModalComponent, CtaComponent, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './work-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkPageComponent implements OnInit, OnDestroy {
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private titleService: Title = inject(Title);
  private metaService: Meta = inject(Meta);
  private languageService: LanguageService = inject(LanguageService);

  // Page Header Content
  pageTitle = this.languageService.get('pages.work.title');
  pageSubtitle = this.languageService.get('pages.work.subtitle');

  selectedPortfolioItem = signal<PortfolioItem | null>(null);

  // Data signals from DataService
  portfolioItems = this.dataService.portfolioItems;
  clients = this.dataService.clients;
  
  activePortfolioCategory = signal<string>('All');
  
  private originalTitle = '';
  private defaultMetaDescription: MetaDefinition = {
    name: 'description',
    content: "As a new agency, our inaugural projects are bound by strict non-disclosure agreements. We are proud of the groundbreaking work we're delivering and eagerly await the opportunity to share these case studies publicly."
  };
  
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
  
  ngOnInit(): void {
    this.originalTitle = this.titleService.getTitle();
    this.metaService.updateTag(this.defaultMetaDescription);
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.originalTitle);
    this.metaService.removeTag(`name='description'`);
  }
  
  onPortfolioFilterChange(category: string): void {
    this.activePortfolioCategory.set(category);
  }

  openPortfolioModal(item: PortfolioItem): void { 
    this.selectedPortfolioItem.set(item); 
    this.titleService.setTitle(`StellarDev | Case Study: ${item.title}`);
    this.metaService.updateTag({ name: 'description', content: item.description });
  }

  closePortfolioModal(): void { 
    this.selectedPortfolioItem.set(null); 
    this.titleService.setTitle(this.originalTitle);
    this.metaService.updateTag(this.defaultMetaDescription);
  }
  
  onScrollTo(payload: { event: Event; href: string }): void {
    payload.event.preventDefault();
    this.router.navigate(['/contact']);
  }
}