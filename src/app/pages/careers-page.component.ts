import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DataService } from '../data.service';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { SectionDividerComponent } from '../components/section-divider.component';
import { Router } from '@angular/router';
import { StellarDevEthosComponent } from '../components/stellardev-ethos.component';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [PageHeaderComponent, AnimateOnScrollDirective, SectionDividerComponent, StellarDevEthosComponent],
  templateUrl: './careers-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareersPageComponent {
  private dataService = inject(DataService);
  private router = inject(Router);
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }

  // Page Header Content
  pageTitle = this.textContentService.get('pages.careers.title');
  pageSubtitle = this.textContentService.get('pages.careers.subtitle');

  // Data signals from DataService
  stellarDevEthos = this.dataService.stellarDevEthos;
}
