import { Component, ChangeDetectionStrategy, input, signal, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Service, EngagementModel, Technology } from '../models';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { TechnologyConstellationComponent } from './technology-constellation.component';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [AnimateOnScrollDirective, TechnologyConstellationComponent],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
  private document: Document = inject(DOCUMENT);
  private textContentService = inject(TextContentService);

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  services = input.required<Service[]>();
  engagementModels = input.required<EngagementModel[]>();
  technologies = input.required<Technology[]>();

  activeServiceIndex = signal(0);
  activeService = computed(() => {
    const services = this.services();
    const index = this.activeServiceIndex();
    if (services && services.length > index) {
      return services[index];
    }
    return null;
  });

  isAnimating = signal(true);

  // --- New signals for Technology section ---
  activeTechCategory = signal<'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Design'>('Frontend');
  hoveredTechnology = signal<string | null>(null);

  // Hardcoded order for categories
  techCategories: ('Frontend' | 'Backend' | 'DevOps & Cloud' | 'Design')[] = ['Frontend', 'Backend', 'DevOps & Cloud', 'Design'];

  filteredTechnologies = computed(() => {
    const category = this.activeTechCategory();
    return this.technologies().filter(tech => tech.category === category);
  });
  // --- End of new signals ---

  selectService(index: number): void {
    if (this.activeServiceIndex() === index) {
      return;
    }

    this.isAnimating.set(false);

    // Defer setting the new index to allow the view to update without the animation class,
    // then re-add it to trigger the animation on the new content.
    setTimeout(() => {
      this.activeServiceIndex.set(index);
      this.isAnimating.set(true);
    }, 10);
  }

  // --- New methods for Technology section ---
  selectTechCategory(category: 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Design'): void {
    this.activeTechCategory.set(category);
  }

  highlightTechnology(techName: string | null): void {
    this.hoveredTechnology.set(techName);
  }

  getTechId(techName: string): string {
    return 'tech-' + techName.replace(/[^a-zA-Z0-9]/g, '-');
  }

  onTechnologyClick(tech: Technology): void {
    this.selectTechCategory(tech.category);
    
    // Defer scrolling to allow the view to update with the new category
    setTimeout(() => {
        const techId = this.getTechId(tech.name);
        const element = this.document.getElementById(techId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  }
}
