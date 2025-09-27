import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavLink } from '../models';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = input.required<number>();
  navLinks = input.required<NavLink[]>();
  
  openTermsModal = output<void>();
  openPrivacyModal = output<void>();

  newsletterFormStatus = signal<'idle' | 'submitting' | 'success'>('idle');
  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitNewsletter(): void {
    if (this.newsletterForm.invalid) {
        this.newsletterForm.markAllAsTouched();
        return;
    }
    this.newsletterFormStatus.set('submitting');
    console.log('Newsletter signup:', this.newsletterForm.value.email);

    // Simulate network request
    setTimeout(() => {
        this.newsletterFormStatus.set('success');
    }, 1500);
  }
}