import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { rawPrinciplesData } from '../../data/principles.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

interface Principle {
  title: string;
  description: string;
  iconSvg: SafeHtml;
}

@Component({
  selector: 'app-principles-section',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective, TiltOnHoverDirective],
  templateUrl: './principles-section.component.html',
  styles: [`
    .pattern-bg {
      background-image: radial-gradient(#d1d5db 0.5px, transparent 0.5px);
      background-size: 1.5rem 1.5rem;
      opacity: 0.3;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrinciplesSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);
  principles: Principle[];

  constructor() {
    this.principles = rawPrinciplesData.map(p => ({
      ...p,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(p.iconSvg)
    }));
  }
}
