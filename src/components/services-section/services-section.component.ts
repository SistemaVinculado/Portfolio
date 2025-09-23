import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ScrollService } from '../../services/scroll.service';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { rawServicesData } from '../../data/services.data';

interface Service {
  name: string;
  description: string;
  imageUrl: string;
  iconSvg: SafeHtml;
  themeColor: string;
  details: string;
  benefits: string[];
  techStack: string[];
}

@Component({
  selector: 'app-services-section',
  templateUrl: './services-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimateOnScrollDirective, ShimmerTextDirective, CommonModule],
})
export class ServicesSectionComponent {
  private readonly scrollService = inject(ScrollService);
  private readonly sanitizer = inject(DomSanitizer);

  hoveredService = signal<string | null>(null);
  selectedService = signal<string | null>(null);
  services: Service[];

  readonly imageForService = computed(() => {
    return this.hoveredService() ?? this.selectedService();
  });

  constructor() {
    this.services = rawServicesData.map((service) => ({
      ...service,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(service.iconSvgPath),
    }));
  }

  onServiceMouseEnter(serviceName: string): void {
    this.hoveredService.set(serviceName);
  }

  onServiceMouseLeave(): void {
    this.hoveredService.set(null);
  }

  toggleService(serviceName: string): void {
    this.selectedService.update(current => (current === serviceName ? null : serviceName));
  }

  scrollToQuoteBuilder(): void {
    this.scrollService.scrollToElementById('quote-builder');
  }
}