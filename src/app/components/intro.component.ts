import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { Client, StatItem } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { CountUpDirective } from '../directives/count-up.directive';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [AnimateOnScrollDirective, CountUpDirective, TranslatePipe],
  templateUrl: './intro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  clients = input.required<Client[]>();
  stats = input.required<StatItem[]>();

  scrollTo = output<{ event: Event; href: string }>();

  isDetailsExpanded = signal(false);

  toggleDetails(): void {
    this.isDetailsExpanded.update(v => !v);
  }

  onScrollTo(event: Event, href: string) {
    this.scrollTo.emit({ event, href });
  }
}
