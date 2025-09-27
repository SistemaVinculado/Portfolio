import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './cookie-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  accept = output<void>();
}