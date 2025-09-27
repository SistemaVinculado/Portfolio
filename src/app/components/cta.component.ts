import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './cta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {
  scrollTo = output<{ event: Event; href: string }>();

  onScrollTo(event: Event, href: string) {
    this.scrollTo.emit({ event, href });
  }
}
