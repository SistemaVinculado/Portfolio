import { Component, ChangeDetectionStrategy, signal, inject, SecurityContext, computed, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { Philosophy } from '../models';
import { TextContentService } from '../services/text-content.service';

interface Card {
  title: string;
  description: string;
  svgContent: string;
  keyPractices: string[];
}

@Component({
  selector: 'app-philosophy',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './philosophy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhilosophyComponent {
  private sanitizer = inject(DomSanitizer);
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  principles = input.required<Philosophy[]>();

  cards = computed<Card[]>(() => {
    return this.principles().map(p => ({
      title: p.title,
      description: p.description,
      svgContent: `<path stroke-linecap="round" stroke-linejoin="round" d="${p.iconPath}" />`,
      keyPractices: p.keyPractices
    }));
  });

  activeIndex = signal(0);

  // For mobile slider
  mobileSliderStyle = computed(() => {
    const offset = this.activeIndex() * -100;
    return { transform: `translateX(${offset}%)` };
  });

  selectPrinciple(index: number): void {
     this.activeIndex.set(index);
  }

  // --- Carousel Logic ---

  setActive(index: number): void {
    if (index === this.activeIndex()) return;
    this.activeIndex.set(index);
  }

  getCardStyle(index: number): { [key: string]: string } {
    const active = this.activeIndex();
    const total = this.cards().length;

    let transform = 'scale(0.75)';
    let opacity = '0';
    let zIndex = '0';
    let height = '380px'; // default height for inactive cards

    const prevIndex = (active - 1 + total) % total;
    const nextIndex = (active + 1) % total;

    if (index === active) {
      transform = 'translateX(0) scale(1) rotateY(0deg) rotateX(0deg)';
      zIndex = '10';
      opacity = '1';
      height = '450px'; // Taller for active card
    } else if (index === prevIndex) {
      transform = 'translateX(-50%) scale(0.85) rotateY(35deg) rotateX(10deg)';
      opacity = '0.7';
      zIndex = '5';
    } else if (index === nextIndex) {
      transform = 'translateX(50%) scale(0.85) rotateY(-35deg) rotateX(10deg)';
      opacity = '0.7';
      zIndex = '5';
    } else {
        const isBefore = (index < active && !(active === total - 1 && index === 0)) || (active === 0 && index > nextIndex);
        if (isBefore) {
            transform = `translateX(-80%) scale(0.75) rotateY(45deg) rotateX(15deg)`;
        } else {
            transform = `translateX(80%) scale(0.75) rotateY(-45deg) rotateX(15deg)`;
        }
    }
    
    return { transform, opacity, zIndex, height };
  }
  
  getCardMaskClass(index: number): string {
    const active = this.activeIndex();
    const total = this.cards().length;
    const prevIndex = (active - 1 + total) % total;
    const nextIndex = (active + 1) % total;

    if (index === prevIndex) return 'mask-gradient-to-l';
    if (index === nextIndex) return 'mask-gradient-to-r';
    return '';
  }
}
