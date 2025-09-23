import { Component, ChangeDetectionStrategy, signal, inject, computed, viewChild, ElementRef, effect, afterNextRender } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ModalService } from '../../services/modal.service';
import { ServiceOffering } from '../../models/service-offering.model';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { angularServicesData, backendServicesData, reactServicesData } from '../../data/detailed-services.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-detailed-services-section',
  standalone: true,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective, TiltOnHoverDirective],
  templateUrl: './detailed-services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedServicesSectionComponent {
  private readonly modalService = inject(ModalService);
  
  activeTab = signal<'angular' | 'react' | 'backend'>('angular');
  selectedService = signal<string | null>(null);

  private readonly angularBtn = viewChild.required<ElementRef<HTMLButtonElement>>('angularBtn');
  private readonly reactBtn = viewChild.required<ElementRef<HTMLButtonElement>>('reactBtn');
  private readonly backendBtn = viewChild.required<ElementRef<HTMLButtonElement>>('backendBtn');

  private readonly highlightWidth = signal(0);
  private readonly highlightTransform = signal('translateX(0px)');

  readonly activeGlowColor = computed(() => {
    switch (this.activeTab()) {
      case 'angular': return '#ef4444'; // red-500
      case 'react': return '#3b82f6'; // blue-500
      case 'backend': return '#a855f7'; // purple-500
      default: return '#6b7280'; // gray-500
    }
  });

  readonly highlightStyle = computed(() => ({
    width: `${this.highlightWidth()}px`,
    transform: this.highlightTransform(),
    'box-shadow': `0 0 15px 2px ${this.activeGlowColor()}`
  }));

  angularServices: ServiceOffering[];
  reactServices: ServiceOffering[];
  backendServices: ServiceOffering[];

  readonly activeServices = computed(() => {
    switch(this.activeTab()) {
      case 'angular': return this.angularServices;
      case 'react': return this.reactServices;
      case 'backend': return this.backendServices;
    }
  });

  constructor() {
    this.angularServices = angularServicesData;
    this.reactServices = reactServicesData;
    this.backendServices = backendServicesData;

    const sortFn = (a: ServiceOffering, b: ServiceOffering) => this.parsePrice(a.price) - this.parsePrice(b.price);
    this.angularServices.sort(sortFn);
    this.reactServices.sort(sortFn);
    this.backendServices.sort(sortFn);

    afterNextRender(() => {
        this.updateHighlight(this.activeTab());
    });

    effect(() => {
        this.updateHighlight(this.activeTab());
    });
  }

  private parsePrice(price: string): number {
    if (price.toLowerCase() === 'sob consulta') {
      return Infinity;
    }
    // Extracts the first number from strings like "R$ 12.000 - R$ 30.000" or "A partir de R$ 5.000"
    const match = price.match(/(\d{1,3}(?:\.\d{3})*)/);
    if (match) {
      // "12.000" -> "12000" -> 12000
      const numberString = match[0].replace(/\./g, '');
      return parseInt(numberString, 10);
    }
    return 0; // Fallback for unexpected formats
  }

  setActiveTab(tab: 'angular' | 'react' | 'backend'): void {
    this.activeTab.set(tab);
    this.selectedService.set(null);
  }

  private updateHighlight(tab: 'angular' | 'react' | 'backend'): void {
    let activeBtnElRef: ElementRef<HTMLButtonElement> | undefined;

    switch (tab) {
        case 'angular':
            activeBtnElRef = this.angularBtn();
            break;
        case 'react':
            activeBtnElRef = this.reactBtn();
            break;
        case 'backend':
            activeBtnElRef = this.backendBtn();
            break;
    }

    if (activeBtnElRef) {
        const el = activeBtnElRef.nativeElement;
        this.highlightWidth.set(el.offsetWidth);
        this.highlightTransform.set(`translateX(${el.offsetLeft}px)`);
    }
  }

  toggleService(serviceName: string): void {
    this.selectedService.update(current => current === serviceName ? null : serviceName);
  }

  requestQuote(service: ServiceOffering): void {
    this.modalService.requestQuote(service);
  }
}
