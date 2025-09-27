import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  templateUrl: './cookie-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  accept = output<void>();
}
