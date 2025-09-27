import { Component, ChangeDetectionStrategy, output } from '@angular/core';

interface Language {
  code: 'en' | 'pt-BR';
  name: string;
  nativeName: string;
  flag: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  languageSelected = output<'en' | 'pt-BR'>();

  languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  ];

  selectLanguage(langCode: 'en' | 'pt-BR'): void {
    const lang = this.languages.find(l => l.code === langCode);
    if (!lang?.disabled) {
      this.languageSelected.emit(langCode);
    }
  }
}
