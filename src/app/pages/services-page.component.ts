import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '../data.service';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { FeaturesComponent } from '../components/features.component';
import { CtaComponent } from '../components/cta.component';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [PageHeaderComponent, FeaturesComponent, CtaComponent],
  templateUrl: './services-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent {
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private languageService: LanguageService = inject(LanguageService);

  // Page Header Content
  pageTitle = this.languageService.get('pages.services.title');
  pageSubtitle = this.languageService.get('pages.services.subtitle');

  // Data signals from DataService
  services = this.dataService.services;
  engagementModels = this.dataService.engagementModels;
  technologies = this.dataService.technologies;

  onScrollTo(payload: { event: Event; href: string }): void {
    payload.event.preventDefault();
    this.router.navigate(['/contact']);
  }
}