import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioItem } from '../models';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-portfolio-modal',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './portfolio-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioModalComponent {
  private textContentService = inject(TextContentService);
  item = input.required<PortfolioItem>();
  close = output<void>();

  t(key: string): string {
    return this.textContentService.get(key)();
  }
}
