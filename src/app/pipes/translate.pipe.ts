import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private langService = inject(LanguageService);

  transform(key: string, params: { [key: string]: any } = {}): string {
    let translation = this.langService.get(key)();
    if (translation && typeof translation === 'string') {
      Object.keys(params).forEach(paramKey => {
        const regex = new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g');
        translation = translation.replace(regex, params[paramKey]);
      });
    }
    return translation;
  }
}
