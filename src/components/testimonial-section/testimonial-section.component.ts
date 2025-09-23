import { Component, ChangeDetectionStrategy, signal, inject, effect, Renderer2, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ClientStory } from '../../models/client-story.model';
import { clientStoriesData } from '../../data/testimonials.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-testimonial-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective, TiltOnHoverDirective],
  templateUrl: './testimonial-section.component.html',
  styles: [`
    .testimonial-card-content {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #242424; /* charcoal-light */
      border-radius: 1rem; /* rounded-2xl */
      border: 1px solid rgb(255 255 255 / 0.1);
      transition: all 0.3s ease;
    }

    .testimonial-card-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(circle 350px at 50% 150%, var(--theme-color), transparent 60%);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 1;
    }

    .group-hover\\:-translate-y-2 .testimonial-card-content::before {
      opacity: 0.15;
    }

    .testimonial-card-content::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-position: 0 0;
      transition: background-position 0.6s ease-out;
      z-index: 0;
    }

    .group-hover\\:-translate-y-2 .testimonial-card-content::after {
      background-position: -1.5rem -1.5rem;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialSectionComponent {
  private readonly renderer = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);
  readonly selectedStory = signal<ClientStory | null>(null);
  readonly activeIndex = signal(0);

  readonly cardStyles = computed(() => {
    const activeIdx = this.activeIndex();
    const numStories = this.clientStories.length;

    return this.clientStories.map((_, i) => {
      const offset = i - activeIdx;
      const absOffset = Math.abs(offset);

      let transform: string;
      let opacity = '1';
      let zIndex = numStories - absOffset;
      
      // Default to hidden state far away
      transform = `translateY(${offset * 2}rem) scale(0.8)`;
      opacity = '0';

      if (absOffset <= 2) { // Show active and 2 cards behind
        transform = `translateY(${offset * 2}rem) scale(${1 - absOffset * 0.1})`;
        opacity = '1';
      }
      
      if (offset < 0) { // Cards in the past animate out
        transform = 'translateX(-50%) scale(0.8)';
        opacity = '0';
      }

      if (offset === 0) { // Active card
        transform = 'scale(1)';
      }


      return {
        transform,
        opacity,
        zIndex,
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        pointerEvents: offset === 0 ? 'auto' : 'none',
      };
    });
  });

  clientStories: ClientStory[] = clientStoriesData;

  constructor() {
    effect(() => {
        if (this.selectedStory()) {
            this.renderer.addClass(this.document.body, 'overflow-hidden');
        } else {
            this.renderer.removeClass(this.document.body, 'overflow-hidden');
        }
    });
  }
  
  next(): void {
    this.activeIndex.update(current => (current + 1) % this.clientStories.length);
  }

  prev(): void {
    this.activeIndex.update(current => (current - 1 + this.clientStories.length) % this.clientStories.length);
  }

  openModal(story: ClientStory): void {
    this.selectedStory.set(story);
  }
  
  closeModal(): void {
    this.selectedStory.set(null);
  }
}
