import { Component, ChangeDetectionStrategy, computed, signal, inject } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { CursorHoverDirective } from '../../directives/cursor-hover.directive';
import { availabilityData } from '../../data/availability.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-availability-section',
  standalone: true,
  imports: [AnimateOnScrollDirective, CursorHoverDirective, TiltOnHoverDirective],
  templateUrl: './availability-section.component.html',
  styles: [`
    .text-glow {
      text-shadow: 0 0 6px rgba(255, 255, 255, 0.2), 0 0 15px rgba(74, 222, 128, 0.1); /* green-500 glow */
      transition: text-shadow 0.4s ease-out;
    }
    .group:hover .text-glow {
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.3), 0 0 30px rgba(74, 222, 128, 0.2);
    }

    .perspective-container {
      perspective: 1500px;
    }
    
    .dot-solid {
      transition: all 0.3s ease;
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.7);
    }
    .group:hover .dot-solid {
      transform: scale(1.2);
      box-shadow: 0 0 25px rgba(74, 222, 128, 1);
    }
    .dot-outline {
      transition: all 0.3s ease;
    }
    .group:hover .dot-outline {
      transform: scale(1.2) rotate(90deg);
      border-color: #4ade80; /* green-500 */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilitySectionComponent {
  private readonly modalService = inject(ModalService);

  private readonly solidPhrases = signal(availabilityData.solidPhrases);
  private readonly outlinePhrases = signal(availabilityData.outlinePhrases);

  // Repeat the phrase multiple times to ensure a seamless loop
  readonly repeatedSolidPhrases = computed(() => {
    const basePhrases = this.solidPhrases();
    const repeated = [];
    for (let i = 0; i < 10; i++) {
      repeated.push(...basePhrases);
    }
    return repeated;
  });

  readonly repeatedOutlinePhrases = computed(() => {
    const basePhrases = this.outlinePhrases();
    const repeated = [];
    for (let i = 0; i < 10; i++) {
      repeated.push(...basePhrases);
    }
    return repeated;
  });

  openAiModal(): void {
    this.modalService.openAiBriefModal('Estou interessado em iniciar um novo projeto.');
  }
}
