import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '../data.service';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { SectionDividerComponent } from '../components/section-divider.component';
import { Router } from '@angular/router';
import { StellarDevEthosComponent } from '../components/stellardev-ethos.component';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [PageHeaderComponent, AnimateOnScrollDirective, SectionDividerComponent, StellarDevEthosComponent, TranslatePipe],
  templateUrl: './careers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPageComponent {
  private dataService = inject(DataService);
  private router = inject(Router);
  private languageService = inject(LanguageService);

  // Page Header Content
  pageTitle = this.languageService.get('pages.careers.title');
  pageSubtitle = this.languageService.get('pages.careers.subtitle');

  // Data signals from DataService
  stellarDevEthos = this.dataService.stellarDevEthos;
}
