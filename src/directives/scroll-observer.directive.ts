import { Directive, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderVisibilityService } from '../services/header-visibility.service';

@Directive({
  selector: '[appScrollObserver]',
  standalone: true,
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class ScrollObserverDirective implements OnInit, OnDestroy {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly headerVisibilityService = inject(HeaderVisibilityService);
  private observer?: IntersectionObserver;

  readonly scrollProgress = signal(0);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = { root: null, rootMargin: '0px', threshold: 0 };
      this.observer = new IntersectionObserver(([entry]) => {
        this.headerVisibilityService.setHeaderForceHidden(entry.isIntersecting);
      }, options);
      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (isPlatformBrowser(this.platformId)) {
      this.headerVisibilityService.setHeaderForceHidden(false);
    }
  }

  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const hostElement = this.elementRef.nativeElement;
    const rect = hostElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = hostElement.offsetHeight - viewportHeight;

    if (rect.top > 0 || rect.bottom < viewportHeight) {
      if (rect.top > 0) {
        this.scrollProgress.set(0);
      } else {
        this.scrollProgress.set(1);
      }
      return;
    }
    
    const scrolledFromTop = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolledFromTop / scrollableDistance));
    this.scrollProgress.set(progress);
  }
}
