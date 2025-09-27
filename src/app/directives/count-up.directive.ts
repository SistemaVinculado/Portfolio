import { Directive, ElementRef, OnInit, OnDestroy, inject, input, Renderer2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private observer!: IntersectionObserver;

  appCountUp = input.required<number>();
  duration = input(2000); // in milliseconds

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateValue();
            this.observer.unobserve(this.elementRef.nativeElement);
          }
        });
      }, { threshold: 0.1 });
      this.observer.observe(this.elementRef.nativeElement);
    } else {
        this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', this.appCountUp().toString());
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private animateValue(): void {
    const startValue = 0;
    const endValue = this.appCountUp();
    const animationDuration = this.duration();
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / animationDuration, 1);
      const currentValue = Math.floor(progress * endValue);

      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', currentValue.toString());

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', endValue.toString());
      }
    };
    window.requestAnimationFrame(step);
  }
}
