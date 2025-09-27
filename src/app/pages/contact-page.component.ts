import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { DataService } from '../data.service';

// Component Imports
import { PageHeaderComponent } from '../components/page-header.component';
import { ContactComponent } from '../components/contact.component';
import { SocialProofComponent } from '../components/social-proof.component';
import { SectionDividerComponent } from '../components/section-divider.component';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PageHeaderComponent, ContactComponent, SocialProofComponent, SectionDividerComponent],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  private dataService: DataService = inject(DataService);
  private router: Router = inject(Router);
  private languageService: LanguageService = inject(LanguageService);

  // Page Header Content
  pageTitle = this.languageService.get('pages.contact.title');
  pageSubtitle = this.languageService.get('pages.contact.subtitle');

  // Data signals from DataService
  faqs = this.dataService.faqs;
  openFaqQuestion = signal<string | null>(null);

  initialMessage = signal<string | null>(null);

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    const messageFromState = navigation?.extras.state?.['message'];
    if (messageFromState) {
      this.initialMessage.set(messageFromState);
    }
  }

  toggleFaq(question: string): void {
    this.openFaqQuestion.update(current => current === question ? null : question);
  }
}
