import { Component, ChangeDetectionStrategy, input, output, signal, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink, MegaMenuLink, MegaMenuGroup } from '../models';
import { MenuStarfieldComponent } from './menu-starfield.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MenuStarfieldComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private dataService = inject(DataService);

  navLinks = input.required<NavLink[]>();
  theme = input.required<'light' | 'dark'>();
  isMobileMenuOpen = input.required<boolean>();

  toggleTheme = output<void>();
  toggleMobileMenu = output<void>();
  closeMobileMenu = output<void>();

  isMenuRendered = signal(false);
  isMenuAnimatingIn = signal(false);

  // New state for multi-level menu
  megaMenuData = this.dataService.megaMenuData;
  activeSubMenu = signal<MegaMenuLink | null>(null);

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

  openSubMenu(menuLink: MegaMenuLink): void {
    if (menuLink.children) {
      this.activeSubMenu.set(menuLink);
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
