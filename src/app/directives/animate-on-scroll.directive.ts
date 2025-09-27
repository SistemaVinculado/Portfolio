import { Directive, ElementRef, OnInit, OnDestroy, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private observer!: IntersectionObserver;

  delay = input('0s');
  threshold = input(0.1);

  ngOnInit(): void {
    const el = this.elementRef.nativeElement;

    // Set initial state & transition properties
    this.renderer.addClass(el, 'opacity-0');
    this.renderer.addClass(el, 'translate-y-5');
    this.renderer.addClass(el, 'transition-all');
    this.renderer.addClass(el, 'duration-700');
    this.renderer.addClass(el, 'ease-out');
    this.renderer.setStyle(el, 'transition-delay', this.delay());


    const options = {
      threshold: this.threshold()
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.removeClass(el, 'opacity-0');
          this.renderer.removeClass(el, 'translate-y-5');
          this.renderer.addClass(el, 'opacity-100');
          this.renderer.addClass(el, 'translate-y-0');
          this.observer.unobserve(el);
        }
      });
    }, options);

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
