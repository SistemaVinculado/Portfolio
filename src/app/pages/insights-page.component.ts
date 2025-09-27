import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { DataService } from '../data.service';
import { BlogPost } from '../models';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { CommunityComponent } from '../components/community.component';
import { BlogModalComponent } from '../components/blog-modal.component';
import { VisitorGlobeComponent } from '../components/visitor-globe.component';
import { CtaComponent } from '../components/cta.component';
import { Router } from '@angular/router';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-insights-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    CommunityComponent,
    BlogModalComponent,
    VisitorGlobeComponent,
    CtaComponent
  ],
  templateUrl: './insights-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsightsPageComponent {
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private textContentService: TextContentService = inject(TextContentService);

  // Page Header Content
  pageTitle = this.textContentService.get('pages.insights.title');
  pageSubtitle = this.textContentService.get('pages.insights.subtitle');

  selectedBlogPost = signal<BlogPost | null>(null);
  showVisitorGlobe = signal(false);

  // Data signals from DataService
  labExperiments = this.dataService.labExperiments;
  blogPosts = this.dataService.blogPosts;

  openBlogModal(post: BlogPost): void { this.selectedBlogPost.set(post); }
  closeBlogModal(): void { this.selectedBlogPost.set(null); }
  openVisitorGlobe(): void { this.showVisitorGlobe.set(true); }
  closeVisitorGlobe(): void { this.showVisitorGlobe.set(false); }
  
  onScrollTo(payload: { event: Event; href: string }): void {
    payload.event.preventDefault();
    this.router.navigate(['/contact']);
  }
}
