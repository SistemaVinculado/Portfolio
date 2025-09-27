import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  private translations = signal<any>({});
  
  currentLanguage = signal<'en' | 'pt-BR'>('en');

  constructor() {
    effect(() => {
      this.loadLanguage(this.currentLanguage());
    });
  }

  setLanguage(lang: 'en' | 'pt-BR'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.currentLanguage.set(lang);
  }

  private loadLanguage(lang: string): void {
    if (!lang) return;
    // This path is derived from evidence in index.html (href="src/styles.css"),
    // indicating a non-standard build that preserves the `src` directory.
    const path = `src/assets/i18n/${lang}.json`;
    this.http.get<any>(path)
      .pipe(take(1))
      .subscribe({
        next: (translations) => this.translations.set(translations),
        error: (err) => console.error(`Could not load translation file for language ${lang}.`, err)
      });
  }
  
  get(key: string) {
    return computed(() => {
      const translations = this.translations();
      // Basic key traversal, e.g., 'home.hero.title'
      return key.split('.').reduce((o, i) => o?.[i], translations) || key;
    });
  }
}
