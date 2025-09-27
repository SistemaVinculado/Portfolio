import { Component, ChangeDetectionStrategy, input, signal, OnInit, inject } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { StellarDevEthos } from '../models';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-stellardev-ethos',
  standalone: true,
  imports: [AnimateOnScrollDirective],
  templateUrl: './stellardev-ethos.component.html',
  styleUrls: ['./stellardev-ethos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StellarDevEthosComponent implements OnInit {
  private textContentService = inject(TextContentService);
  
  t(key: string): string {
    return this.textContentService.get(key)();
  }

  ethosItems = input.required<StellarDevEthos[]>();
  
  activeIndex = signal(0);
  isAnimatingOut = signal(false);
  displayedEthos = signal<StellarDevEthos | undefined>(undefined);

  ngOnInit(): void {
    // Initialize with the first item when the component's inputs are ready.
    if (this.ethosItems().length > 0) {
      this.displayedEthos.set(this.ethosItems()[0]);
    }
  }

  selectEthos(index: number): void {
    if (this.activeIndex() === index) {
      return;
    }

    this.activeIndex.set(index);
    this.isAnimatingOut.set(true);

    setTimeout(() => {
      this.displayedEthos.set(this.ethosItems()[index]);
      this.isAnimatingOut.set(false);
    }, 300); // This must match the fade-out animation duration
  }
}
