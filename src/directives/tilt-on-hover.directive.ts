import { Directive, ElementRef, inject, input, computed, signal } from '@angular/core';

@Directive({
  selector: '[appTiltOnHover]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
    '[style.transition]': "'transform 0.1s linear'",
    '[style.transform]': 'transform()',
    '[style.transform-style]': "'preserve-3d'",
    '[class.is-tilted]': 'isHovering()'
  }
})
export class TiltOnHoverDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  
  maxTilt = input<number>(7);
  hoverScale = input<number>(1);
  zTranslate = input<number>(0);

  private readonly rotateX = signal(0);
  private readonly rotateY = signal(0);
  private readonly isHovering = signal(false);

  transform = computed(() => {
    if (this.isHovering()) {
      return `perspective(1000px) rotateX(${this.rotateX()}deg) rotateY(${this.rotateY()}deg) scale(${this.hoverScale()}) translateZ(${this.zTranslate()}px)`;
    }
    return `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)`;
  });

  onMouseEnter(): void {
    this.isHovering.set(true);
  }
  
  onMouseMove(event: MouseEvent): void {
    if (!this.isHovering()) return;

    const el = this.elementRef.nativeElement;
    const rect = el.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { width, height } = rect;

    const centerX = width / 2;
    const centerY = height / 2;

    this.rotateX.set((y - centerY) / centerY * -this.maxTilt());
    this.rotateY.set((x - centerX) / centerX * this.maxTilt());
  }

  onMouseLeave(): void {
    this.isHovering.set(false);
    this.rotateX.set(0);
    this.rotateY.set(0);
  }
}
