import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  template: `
    <header class="py-16 sm:py-20 text-center bg-[#EAE8E3] dark:bg-[#292639] rounded-b-3xl">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 appAnimateOnScroll class="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#292639] dark:text-white">{{ title() }}</h1>
        @if (subtitle()) {
          <p appAnimateOnScroll delay="100ms" class="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{{ subtitle() }}</p>
        }
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
