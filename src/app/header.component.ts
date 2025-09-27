import { Component, ChangeDetectionStrategy, input, output, signal, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink, MegaMenuLink, MegaMenuGroup } from './models';
import { MenuStarfieldComponent } from './components/menu-starfield.component';
import { DataService } from './data.service';
import { LanguageService } from './services/language.service';
import { TranslatePipe } from './pipes/translate.pipe';

interface LanguageOption {
  code: 'en' | 'pt-BR';
  name: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MenuStarfieldComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private dataService: DataService = inject(DataService);
  private languageService: LanguageService = inject(LanguageService);

  navLinks = input.required<NavLink[]>();
  theme = input.required<'light' | 'dark'>();
  isMobileMenuOpen = input.required<boolean>();

  toggleTheme = output<void>();
  toggleMobileMenu = output<void>();
  closeMobileMenu = output<void>();

  isMenuRendered = signal(false);
  isMenuAnimatingIn = signal(false);
  isLangMenuOpen = signal(false);

  // New state for multi-level menu
  megaMenuData = this.dataService.megaMenuData;
  activeSubMenu = signal<MegaMenuLink | null>(null);
  
  languages: LanguageOption[] = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português (Brasil)' },
  ];
  currentLanguage = this.languageService.currentLanguage;

  constructor() {
    effect(onCleanup => {
        const isOpen = this.isMobileMenuOpen();
        if (isOpen) {
            this.isMenuRendered.set(true);
            const t = setTimeout(() => this.isMenuAnimatingIn.set(true), 20); // Delay to allow rendering before animation
            onCleanup(() => clearTimeout(t));
        } else {
            this.isMenuAnimatingIn.set(false);
            const t = setTimeout(() => {
              this.isMenuRendered.set(false);
              this.activeSubMenu.set(null); // Reset submenu when main menu closes
            }, 300); // Wait for animation to finish
            onCleanup(() => clearTimeout(t));
        }
    });
  }

  toggleLangMenu(): void {
    this.isLangMenuOpen.update(v => !v);
  }

  selectLanguage(lang: LanguageOption): void {
    if (!lang.disabled) {
      this.languageService.setLanguage(lang.code);
      this.isLangMenuOpen.set(false);
    }
  }

  openSubMenu(link: MegaMenuLink): void {
    if (link.children) {
      this.activeSubMenu.set(link);
    }
  }

  closeSubMenu(): void {
    this.activeSubMenu.set(null);
  }

  // Helper to check if a menu item is a group
  isMegaMenuGroup(item: any): item is MegaMenuGroup {
    return item.items !== undefined;
  }
}