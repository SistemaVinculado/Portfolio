import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioItem, ProcessStep, TeamMember } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [AnimateOnScrollDirective, NgOptimizedImage],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  portfolioItems = input.required<PortfolioItem[]>();
  processSteps = input.required<ProcessStep[]>();
  teamMembers = input.required<TeamMember[]>();
  categories = input.required<string[]>();
  activeCategory = input.required<string>();

  openPortfolioModal = output<PortfolioItem>();
  filterChange = output<string>();
}
