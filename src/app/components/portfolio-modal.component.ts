import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioItem } from '../models';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './portfolio-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioModalComponent {
  item = input.required<PortfolioItem>();
  close = output<void>();
}
