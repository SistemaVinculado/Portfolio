import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioItem, ProcessStep } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [AnimateOnScrollDirective, NgOptimizedImage],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  portfolioItems = input.required<PortfolioItem[]>();
  processSteps = input.required<ProcessStep[]>();
  categories = input.required<string[]>();
  activeCategory = input.required<string>();

  showPortfolio = input(true);
  showProcess = input(true);

  openPortfolioModal = output<PortfolioItem>();
  filterChange = output<string>();
}
