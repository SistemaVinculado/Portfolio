import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  templateUrl: './back-to-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {
  backToTop = output<void>();
}
