import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  templateUrl: './cta-section.component.html',
  styles: [`
    .cta-card-glow {
      position: absolute;
      inset: 0;
      border-radius: 1.5rem; /* rounded-3xl */
      box-shadow: 0 0 15px 2px rgba(74, 222, 128, 0.1); /* green-500 glow */
      animation: glow-pulse 4s infinite ease-in-out;
      transition: box-shadow 0.3s ease;
    }
    .group:hover .cta-card-glow {
      box-shadow: 0 0 25px 8px rgba(74, 222, 128, 0.15); /* green-500 glow */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnimateOnScrollDirective,
    ReactiveFormsModule,
    CommonModule,
    ShimmerTextDirective,
    TiltOnHoverDirective,
  ],
})
export class CtaSectionComponent {
  private readonly modalService = inject(ModalService);

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  isSubmitting = signal(false);

  submitForm(): void {
    if (this.emailControl.invalid || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);

    // Simulate network request
    setTimeout(() => {
      const email = this.emailControl.value;
      const initialText = `O cliente com o e-mail '${email}' está interessado em um projeto. Minha ideia é...`;
      this.modalService.openAiBriefModal(initialText);
      this.isSubmitting.set(false);
    }, 750);
  }
}
