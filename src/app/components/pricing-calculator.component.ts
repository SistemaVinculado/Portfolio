import { Component, ChangeDetectionStrategy, output, signal, computed, OnDestroy, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

interface TeamRole {
  name: string;
  icon: string;
}

interface Team {
  name: string;
  roles: TeamRole[];
}

@Component({
  selector: 'app-pricing-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, AnimateOnScrollDirective],
  templateUrl: './pricing-calculator.component.html',
  styleUrls: ['./pricing-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCalculatorComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  
  // Make these public for template access
  calculatorScopes = this.dataService.calculatorScopes;
  calculatorComplexities = this.dataService.calculatorComplexities;
  
  scrollTo = output<{ event: Event; href: string; message: string }>();
  
  calculatorForm!: FormGroup;
  private formSubscription!: Subscription;
  private formValue = signal<any>({});

  // Constants for SVG progress bar
  readonly circumference = 2 * Math.PI * 45; // r = 45

  private readonly teamRoles: { [key: string]: TeamRole } = {
    'PM': { name: 'Project Manager', icon: 'M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h5.25m-5.25 0h5.25m-5.25 0h5.25M3 4.5h15A2.25 2.25 0 0120.25 6.75v10.5A2.25 2.25 0 0118 19.5H6A2.25 2.25 0 013.75 17.25V6.75A2.25 2.25 0 016 4.5h.75z' },
    'Designer': { name: 'UI/UX Designer', icon: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z' },
    'FE': { name: 'Frontend Dev', icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' },
    'BE': { name: 'Backend Dev', icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375' },
    'QA': { name: 'QA Engineer', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    'DevOps': { name: 'DevOps Engineer', icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z' }
  };
  
  fullServiceDetails = computed(() => {
    const calcServices = this.dataService.calculatorServices();
    const allServices = this.dataService.services();
    return allServices
      .map(service => {
        const calcData = calcServices.find(cs => cs.id === service.id);
        return { ...service, basePrice: calcData?.basePrice ?? 0, enabled: !!calcData };
      })
      .filter(s => s.enabled);
  });
  
  selectedScope = computed(() => this.calculatorScopes()[this.formValue().scope ?? 1]);
  selectedComplexity = computed(() => this.calculatorComplexities()[this.formValue().complexity ?? 1]);
  
  estimatedPrice = computed(() => this.calculatePrice());
  estimatedTimeline = computed(() => {
    const price = this.calculatePrice().min;
    if (price === 0) return { min: 0, max: 0 };
    const baseWeeks = 4;
    const weeksPer10k = 2;
    const calculatedWeeks = baseWeeks + (price / 10000) * weeksPer10k;
    const minWeeks = Math.max(baseWeeks, Math.round(calculatedWeeks * 0.8));
    const maxWeeks = Math.round(calculatedWeeks * 1.2);
    return { min: minWeeks, max: maxWeeks };
  });

  complexityScore = computed(() => {
    const formVal = this.formValue();
    if (!formVal || !formVal.services) return 0;

    const servicePoints = this.fullServiceDetails().reduce((acc, service) => {
      if (formVal.services[service.id as keyof typeof formVal.services]) {
        return acc + (service.basePrice / 750);
      }
      return acc;
    }, 0);
    
    const scopeMultiplier = this.selectedScope()?.multiplier ?? 1;
    const complexityMultiplier = this.selectedComplexity()?.multiplier ?? 1;

    const score = servicePoints * scopeMultiplier * complexityMultiplier;
    return Math.min(100, Math.round(score));
  });

  recommendedTeam = computed<Team>(() => {
    const score = this.complexityScore();
    if (score < 40) {
      return { name: 'Focus Squad', roles: [this.teamRoles['PM'], this.teamRoles['Designer'], this.teamRoles['FE']] };
    }
    if (score < 75) {
      return { name: 'Growth Squad', roles: [this.teamRoles['PM'], this.teamRoles['Designer'], this.teamRoles['FE'], this.teamRoles['BE'], this.teamRoles['QA']] };
    }
    return { name: 'Enterprise Crew', roles: [this.teamRoles['PM'], this.teamRoles['Designer'], this.teamRoles['FE'], this.teamRoles['BE'], this.teamRoles['QA'], this.teamRoles['DevOps']] };
  });

  timelineSegments = computed(() => {
    const timeline = this.estimatedTimeline();
    if (timeline.min === 0) return [];
    
    const maxPossibleTimeline = 48; // A reasonable max for visualization (e.g., 48 weeks)
    const segments = [];

    const minWidth = (timeline.min / maxPossibleTimeline) * 100;
    const rangeWidth = ((timeline.max - timeline.min) / maxPossibleTimeline) * 100;

    segments.push({ width: minWidth, colorClass: 'bg-[#8A6B93] dark:bg-purple-500' });
    if (rangeWidth > 0) {
      segments.push({ width: rangeWidth, colorClass: 'bg-[#8A6B93]/50 dark:bg-purple-500/50' });
    }
    
    return segments;
  });

  ngOnInit(): void {
    const serviceControls = this.fullServiceDetails().reduce((acc, service) => {
        acc[service.id as string] = new FormControl(false);
        return acc;
    }, {} as {[key: string]: FormControl});
    
    this.calculatorForm = new FormGroup({
      services: new FormGroup(serviceControls),
      scope: new FormControl(1), // Index for medium
      complexity: new FormControl(1) // Index for advanced
    });
    
    this.formSubscription = this.calculatorForm.valueChanges.pipe(
      startWith(this.calculatorForm.value)
    ).subscribe(value => {
        this.formValue.set(value);
    });
  }
  
  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  onScrollTo(event: Event, href: string) {
    event.preventDefault();
    this.scrollTo.emit({ event, href, message: this.getCalculatorSummaryMessage() });
  }

  private calculatePrice(): { min: number, max: number } {
    const formValue = this.formValue();
    if (!formValue?.services) return { min: 0, max: 0 };

    const selectedServices = this.fullServiceDetails().filter(s => formValue.services[s.id as keyof typeof formValue.services]);
    let basePrice = selectedServices.reduce((acc, curr) => acc + curr.basePrice, 0);

    const scopeMultiplier = this.selectedScope()?.multiplier ?? 1;
    const complexityMultiplier = this.selectedComplexity()?.multiplier ?? 1;
    
    if (basePrice === 0) return { min: 0, max: 0 };

    const minPrice = Math.round((basePrice * scopeMultiplier * complexityMultiplier) / 100) * 100;
    const maxPrice = Math.round((minPrice * 1.5) / 100) * 100;
    
    return { min: minPrice, max: maxPrice };
  }

  getCalculatorSummaryMessage(): string {
    const formValue = this.formValue();
    const selectedServices = this.fullServiceDetails()
      .filter(s => formValue.services[s.id as keyof typeof formValue.services])
      .map(s => s.title)
      .join(', ');

    const scope = this.selectedScope()?.name;
    const complexity = this.selectedComplexity()?.name;
    const price = this.estimatedPrice();
    const timeline = this.estimatedTimeline();

    let message = "I've used the Project Launchpad and I'm interested in a detailed quote.\n\n---\n";
    message += `Selected Services: ${selectedServices || 'None'}\n`;
    message += `Project Scope: ${scope}\n`;
    message += `Project Complexity: ${complexity}\n`;
    message += `Complexity Score: ${this.complexityScore()}/100\n`;
    message += `Recommended Team: ${this.recommendedTeam().name}\n`;
    message += `Estimated Price Range: $${price.min.toLocaleString()} - $${price.max.toLocaleString()}\n`;
    message += `Estimated Timeline: ${timeline.min} - ${timeline.max} weeks\n---\n\n`;
    message += "Please provide a more detailed quote based on this blueprint.";

    return message;
  }
}
