import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioItem, ProcessStep } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [AnimateOnScrollDirective, NgOptimizedImage, TranslatePipe],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  portfolioItems = input.required<PortfolioItem[]>();
  processSteps = input.required<ProcessStep[]>();
  categories = input.required<string[]>();
  activeCategory = input.required<string>();

  showPortfolio = input(true);
  showProcess = input(true);

  openPortfolioModal = output<PortfolioItem>();
  filterChange = output<string>();
}
