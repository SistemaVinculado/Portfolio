import { Injectable, signal, computed } from '@angular/core';
import { TEXT_CONTENT } from '../data/text-content.data';

@Injectable({
  providedIn: 'root'
})
export class TextContentService {
  private translations = signal(TEXT_CONTENT);

  get(key: string) {
    return computed(() => {
      const translations = this.translations();
      // Basic key traversal, e.g., 'home.hero.title'
      return key.split('.').reduce((o, i) => o?.[i], translations) || key;
    });
  }
  
  // A regular function for cases where reactivity isn't needed or for complex substitutions
  getWithParams(key: string, params: { [key: string]: any } = {}): string {
    let translation = this.get(key)();
    if (translation && typeof translation === 'string') {
      Object.keys(params).forEach(paramKey => {
        const regex = new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g');
        translation = translation.replace(regex, params[paramKey]);
      });
    }
    return translation;
  }
}
