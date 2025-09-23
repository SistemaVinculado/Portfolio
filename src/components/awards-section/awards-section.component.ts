import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { awardsData } from '../../data/awards.data';

@Component({
  selector: 'app-awards-section',
  templateUrl: './awards-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective],
})
export class AwardsSectionComponent {
  awards = awardsData;
}
