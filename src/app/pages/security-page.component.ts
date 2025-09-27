import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { PageHeaderComponent } from '../components/page-header.component';
import { SecurityDashboardComponent } from '../components/security-dashboard.component';
import { CtaComponent } from '../components/cta.component';
import { SectionDividerComponent } from '../components/section-divider.component';
import { Router } from '@angular/router';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-security-page',
  standalone: true,
  imports: [PageHeaderComponent, SecurityDashboardComponent, SectionDividerComponent, CtaComponent],
  templateUrl: './security-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityPageComponent {
  private router: Router = inject(Router);
  private textContentService: TextContentService = inject(TextContentService);
  
  // Page Header Content
  pageTitle = this.textContentService.get('pages.security.title');
  pageSubtitle = this.textContentService.get('pages.security.subtitle');

  onScrollTo(payload: { event: Event; href: string }): void {
    payload.event.preventDefault();
    this.router.navigate(['/contact']);
  }
}
