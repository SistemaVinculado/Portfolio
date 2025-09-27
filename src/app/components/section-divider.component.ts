import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  template: `
    <div appAnimateOnScroll class="w-full max-w-2xl mx-auto flex items-center justify-center py-12" aria-hidden="true">
      <div class="flex-grow h-px bg-gray-200 dark:bg-gray-700/50"></div>
      <div class="px-4">
        <svg class="w-6 h-6 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L12 5.25l2.846.813a4.5 4.5 0 013.09 3.09L21.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09z" />
        </svg>
      </div>
      <div class="flex-grow h-px bg-gray-200 dark:bg-gray-700/50"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionDividerComponent {}
