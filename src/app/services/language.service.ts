import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { I18N_ASSET_PATH } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private http = inject(HttpClient);
  
  private translations = signal<any>({});
  
  // Language is now fixed to pt-BR
  readonly currentLanguage = signal<'en' | 'pt-BR'>('pt-BR');

  constructor() {
    this.loadLanguage(this.currentLanguage());
  }

  private loadLanguage(lang: string): void {
    if (!lang) return;
    
    const path = `${I18N_ASSET_PATH}${lang}.json`;

    this.http.get<any>(path)
      .pipe(take(1))
      .subscribe({
        next: (translations) => this.translations.set(translations),
        error: (err) => {
          console.error(`[StellarDev] CRITICAL ERROR: Translation file for language "${lang}" could not be loaded.`);
          console.error(`[StellarDev] Attempted Path: "${path}"`);
          console.error(`[StellarDev] This is a build configuration error. Please verify that the I18N_ASSET_PATH in 'src/app/config.ts' correctly points to the translations folder in your deployed application.`);
          console.error('[StellarDev] Original Error:', err);
        }
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
