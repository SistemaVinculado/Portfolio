import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { globalReachStats } from '../../data/global-reach.data';

@Component({
  selector: 'app-global-reach',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './global-reach.component.html',
  styles: [`
    .pulsing-dot {
      animation: pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
    }
    @keyframes pulse {
      0%, 100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
      }
      50% {
        transform: scale(1);
        box-shadow: 0 0 0 12px rgba(255, 255, 255, 0);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalReachComponent {
  stats = globalReachStats;
}
