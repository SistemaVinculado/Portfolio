import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { LegalContent } from '../models';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  templateUrl: './legal-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalModalComponent {
  private textContentService = inject(TextContentService);
  content = input.required<LegalContent>();
  close = output<void>();

  t(key: string): string {
    return this.textContentService.get(key)();
  }
}
