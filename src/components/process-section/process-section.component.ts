import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ProcessStep, processStepsData } from '../../data/process.data';

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [
    CommonModule,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
  ],
  templateUrl: './process-section.component.html',
  styles: [`
    /* For the timeline line in ProcessSectionComponent */
    .timeline-track::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background-image: linear-gradient(to bottom, #242424, #242424 50%, transparent 50%);
      background-size: 1px 12px;
    }

    /* For the glowing effect on the timeline nodes */
    @keyframes timeline-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
      }
    }
    .timeline-node-active {
      animation: timeline-pulse 2s infinite;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSectionComponent {
  steps: ProcessStep[] = processStepsData;
}
