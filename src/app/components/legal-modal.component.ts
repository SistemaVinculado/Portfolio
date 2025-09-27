import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { LegalContent } from '../models';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  templateUrl: './legal-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalModalComponent {
  content = input.required<LegalContent>();
  close = output<void>();
}
