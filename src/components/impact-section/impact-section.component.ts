import { Component, ChangeDetectionStrategy, signal, inject, ElementRef, PLATFORM_ID, effect, OnDestroy, afterNextRender } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { impactStatsData } from '../../data/impact.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

interface Stat {
  value: number;
  displayValue: number;
  suffix: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-impact-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective, TiltOnHoverDirective],
  templateUrl: './impact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactSectionComponent implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private animationFrameId?: number;

  private readonly stats: Omit<Stat, 'displayValue'>[] = impactStatsData;

  readonly displayedStats = signal<Stat[]>(this.stats.map(s => ({ ...s, displayValue: 0 })));

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            this.startCountUpAnimation();
            this.observer?.unobserve(this.elementRef.nativeElement);
          }
        }, { threshold: 0.5 });
        this.observer.observe(this.elementRef.nativeElement);
      }
    });
  }

  private startCountUpAnimation(): void {
    const DURATION = 2500;
    let startTime: number | null = null;
    
    const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const easedProgress = easeOutExpo(progress);

      this.displayedStats.update(currentStats => 
        currentStats.map((stat, i) => ({
          ...stat,
          displayValue: Math.floor(easedProgress * this.stats[i].value),
        }))
      );

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
  
  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
