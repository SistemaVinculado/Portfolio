import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  scrollTo = output<{ event: Event; href: string }>();

  onScrollTo(event: Event, href: string) {
    this.scrollTo.emit({ event, href });
  }
}
