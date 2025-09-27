import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { JobOpening, LabExperiment, BlogPost } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { CodeMatrixComponent } from './code-matrix.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [AnimateOnScrollDirective, NgOptimizedImage, CodeMatrixComponent],
  templateUrl: './community.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityComponent {
  labExperiments = input.required<LabExperiment[]>();
  blogPosts = input.required<BlogPost[]>();

  showLabs = input(true);
  showInsights = input(true);

  scrollTo = output<{ event: Event; href: string, message: string }>();
  openBlogModal = output<BlogPost>();
  openVisitorGlobe = output<void>();

  onScrollTo(event: Event, href: string, message: string) {
    event.preventDefault();
    this.scrollTo.emit({ event, href, message });
  }

  handleLabClick(experiment: LabExperiment): void {
    if (experiment.title === 'Real-time Visitor Globe') {
      this.openVisitorGlobe.emit();
    } else {
      if (experiment.url && experiment.url !== '#') {
        window.open(experiment.url, '_blank');
      }
    }
  }
}