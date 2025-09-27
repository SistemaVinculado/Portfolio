import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { PricingCalculatorComponent } from './pricing-calculator.component';
import { ContactComponent } from './contact.component';
import { CtaComponent } from './cta.component';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-action-zone',
  standalone: true,
  imports: [AnimateOnScrollDirective, PricingCalculatorComponent, ContactComponent, CtaComponent, TranslatePipe],
  templateUrl: './action-zone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionZoneComponent {
  initialContactMessage = input<string | null>(null);
  scrollTo = output<{ event: Event; href: string; message?: string }>();
}
