import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { CommonModule } from '@angular/common';
import { TechCategory, techCategoriesData } from '../../data/tech-stack.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-work-section',
  templateUrl: './work-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnimateOnScrollDirective,
    ShimmerTextDirective,
    CommonModule,
    TiltOnHoverDirective,
  ],
})
export class WorkSectionComponent {
  techCategories: TechCategory[] = techCategoriesData;
}
