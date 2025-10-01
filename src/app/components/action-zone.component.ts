import { Component, ChangeDetectionStrategy, input, output, inject } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { ContactComponent } from './contact.component';
import { CtaComponent } from './cta.component';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-action-zone',
  standalone: true,
  imports: [AnimateOnScrollDirective, ContactComponent, CtaComponent],
  templateUrl: './action-zone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionZoneComponent {
  private textContentService = inject(TextContentService);
  initialContactMessage = input<string | null>(null);
  scrollTo = output<{ event: Event; href: string; message?: string }>();

  t(key: string): string {
    return this.textContentService.get(key)();
  }
}