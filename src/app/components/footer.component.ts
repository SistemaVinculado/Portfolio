import { Component, ChangeDetectionStrategy, input, output, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavLink } from '../models';
import { TextContentService } from '../services/text-content.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private textContentService = inject(TextContentService);
  private dataService = inject(DataService);

  t(key: string, params?: { [key: string]: any }): string {
    return this.textContentService.getWithParams(key, params);
  }

  currentYear = input.required<number>();
  navLinks = input.required<NavLink[]>();
  socialLinks = this.dataService.socialLinks;
  
  // Modals are now handled in HomeComponent, but triggers can be here.
  // Let's have the home component manage this directly for simplicity.
  // The app component still listens for these events globally if we need them.
  // To keep it simple, I am removing them as the home page is now self-contained.
  // Re-adding them and making them global again from home-component.
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