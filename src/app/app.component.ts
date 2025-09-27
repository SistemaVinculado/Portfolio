import { Component, ChangeDetectionStrategy, signal, inject, Renderer2, effect, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { LanguageService } from './services/language.service';

// New Component Imports
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { BackToTopComponent } from './components/back-to-top.component';
import { CosmicPreloaderComponent } from './components/cosmic-preloader.component';
import { AiBuddyComponent } from './components/ai-buddy.component';
import { LegalModalComponent } from './components/legal-modal.component';
import { InteractiveBackgroundComponent } from './components/interactive-background.component';
import { CustomCursorComponent } from './components/custom-cursor.component';
import { CookieBannerComponent } from './components/cookie-banner.component';
import { LanguageSelectorComponent } from './components/language-selector.component';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BackToTopComponent,
    CosmicPreloaderComponent,
    AiBuddyComponent,
    LegalModalComponent,
    InteractiveBackgroundComponent,
    CustomCursorComponent,
    CookieBannerComponent,
    LanguageSelectorComponent,
    TranslatePipe
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private document: Document = inject(DOCUMENT);
  private dataService: DataService = inject(DataService);
  private languageService = inject(LanguageService);
  
  title = 'StellarDev';
  currentYear = new Date().getFullYear();
  isMobileMenuOpen = signal(false);
  showBackToTop = signal(false);
  theme = signal<'light' | 'dark'>('light');

  isLoading = signal(true);
  showPrivacyModal = signal(false);
  showTermsModal = signal(false);
  showAiBuddy = signal(false);
  showCookieBanner = signal(false);
  showUpdateBanner = signal(false);
  showLanguageSelector = signal(false);

  private onScrollListener!: () => void;

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const currentTheme = this.theme();
        if (currentTheme === 'dark') {
          this.renderer.addClass(this.document.documentElement, 'dark');
        } else {
          this.renderer.removeClass(this.document.documentElement, 'dark');
        }
        localStorage.setItem('theme', currentTheme);
      }
    });

    // Combined effect for managing body scroll lock
    effect(() => {
        if (isPlatformBrowser(this.platformId)) {
            const shouldLock = this.isLoading() || this.isMobileMenuOpen() || this.showPrivacyModal() || this.showTermsModal() || this.showAiBuddy() || this.showLanguageSelector();
            if (shouldLock) {
                this.renderer.addClass(this.document.body, 'overflow-hidden');
            } else {
                this.renderer.removeClass(this.document.body, 'overflow-hidden');
            }
        }
    });

    // Effect for handling Escape key to close any open modal
    effect((onCleanup) => {
        const isAnyModalOpen = this.isMobileMenuOpen() || this.showPrivacyModal() || this.showTermsModal() || this.showAiBuddy();
        if (isAnyModalOpen) {
            const escapeListener = this.renderer.listen('document', 'keydown.escape', () => {
                this.closeMobileMenu();
                this.closePrivacyModal();
                this.closeTermsModal();
                this.closeAiBuddy();
            });
            onCleanup(() => {
                escapeListener();
            });
        }
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('language') as 'en' | 'pt-BR' | null;
      if (savedLang) {
        this.languageService.setLanguage(savedLang);
      } else {
        this.showLanguageSelector.set(true);
      }

      if (localStorage.getItem('cookie_consent') !== 'accepted') {
        this.showCookieBanner.set(true);
      }
      
      this.showUpdateBanner.set(true);
      
      setTimeout(() => this.isLoading.set(false), 2500);

      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme) {
        this.theme.set(savedTheme);
      } else {
        this.theme.set(prefersDark ? 'dark' : 'light');
      }

      this.onScrollListener = this.renderer.listen('window', 'scroll', () => {
        const scrollPosition = window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        this.showBackToTop.set(scrollPosition > 300);
      });
    } else {
      this.isLoading.set(false);
    }
  }

  ngOnDestroy(): void {
    if (this.onScrollListener) {
      this.onScrollListener();
    }
  }

  onLanguageSelected(lang: 'en' | 'pt-BR'): void {
    this.languageService.setLanguage(lang);
    this.showLanguageSelector.set(false);
  }

  acceptCookies(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie_consent', 'accepted');
    }
    this.showCookieBanner.set(false);
  }

  dismissUpdateBanner(): void {
    this.showUpdateBanner.set(false);
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.document.body, 'no-transitions');
    }

    this.theme.update(current => (current === 'light' ? 'dark' : 'light'));

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.renderer.removeClass(this.document.body, 'no-transitions');
      }, 50);
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Data signals from DataService
  navLinks = this.dataService.navLinks;
  privacyPolicy = this.dataService.privacyPolicy;
  termsOfService = this.dataService.termsOfService;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(isOpen => !isOpen);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  openPrivacyModal(): void { this.showPrivacyModal.set(true); }
  closePrivacyModal(): void { this.showPrivacyModal.set(false); }
  openTermsModal(): void { this.showTermsModal.set(true); }
  closeTermsModal(): void { this.showTermsModal.set(false); }
  
  openAiBuddy(): void { this.showAiBuddy.set(true); }
  closeAiBuddy(): void { this.showAiBuddy.set(false); }
}
