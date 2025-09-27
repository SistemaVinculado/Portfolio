import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [],
  templateUrl: './cookie-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  accept = output<void>();
}
