import { Component, ChangeDetectionStrategy, inject, signal, computed, viewChild, ElementRef, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ModalService } from '../../services/modal.service';
import { rawFeaturesData } from '../../data/quote-features.data';

interface TechFeatureOption {
  id: string;
  name: string;
  price: number;
}

interface TechFeature {
  id: string;
  name: string;
  description: string;
  price: number;
  iconSvg: SafeHtml;
  options?: TechFeatureOption[];
}

type TechStack = 'angular' | 'react' | 'backend' | 'custom' | 'infrastructure';

@Component({
  selector: 'app-quote-builder',
  standalone: true,
  imports: [CommonModule, AnimateOnScrollDirective, ShimmerTextDirective, ReactiveFormsModule],
  templateUrl: './quote-builder.component.html',
  styles: [`
    /* Custom Range Slider Styles */
    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      background: transparent;
    }

    input[type=range]:focus {
      outline: none;
    }

    /* Track */
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #242424; /* charcoal-light */
      border-radius: 2px;
      border: 1px solid #373737;
    }

    input[type=range]::-moz-range-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: #242424;
      border-radius: 2px;
      border: 1px solid #373737;
    }

    /* Thumb */
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: 2px solid #111111;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
      margin-top: -8px; /* Offset the thumb to center it on the track */
      transition: transform 0.2s ease;
    }

    input[type=range]::-moz-range-thumb {
      border: 2px solid #111111;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background: #ffffff;
      cursor: pointer;
    }

    input[type=range]:active::-webkit-slider-thumb {
      transform: scale(1.2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteBuilderComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly modalService = inject(ModalService);

  activeTab = signal<TechStack>('angular');
  selectedFeatures = signal<Set<string>>(new Set());
  selectedOptions = signal<Set<string>>(new Set());
  targetBudget = signal(15000);
  customProjectControl = new FormControl('', [Validators.required, Validators.minLength(20)]);

  private readonly angularBtn = viewChild.required<ElementRef<HTMLButtonElement>>('angularBtn');
  private readonly reactBtn = viewChild.required<ElementRef<HTMLButtonElement>>('reactBtn');
  private readonly backendBtn = viewChild.required<ElementRef<HTMLButtonElement>>('backendBtn');
  private readonly customBtn = viewChild.required<ElementRef<HTMLButtonElement>>('customBtn');
  private readonly infraBtn = viewChild.required<ElementRef<HTMLButtonElement>>('infraBtn');

  private readonly highlightWidth = signal(0);
  private readonly highlightTransform = signal('translateX(0px)');

  readonly activeGlowColor = computed(() => {
    switch (this.activeTab()) {
      case 'angular': return '#ef4444'; // red-500
      case 'react': return '#3b82f6'; // blue-500
      case 'backend': return '#a855f7'; // purple-500
      case 'custom': return '#f59e0b'; // amber-500
      case 'infrastructure': return '#22c55e'; // green-500
      default: return '#6b7280'; // gray-500
    }
  });

  readonly highlightStyle = computed(() => ({
    width: `${this.highlightWidth()}px`,
    transform: this.highlightTransform(),
    'box-shadow': `0 0 15px 2px ${this.activeGlowColor()}`
  }));

  allFeatures: Record<TechStack, TechFeature[]>;

  activeFeatures = computed(() => this.allFeatures[this.activeTab()]);

  totalCost = computed(() => {
    const selectedFeatureIds = this.selectedFeatures();
    const selectedOptionIds = this.selectedOptions();

    const mainFeaturesCost = this.activeFeatures()
      .filter(f => selectedFeatureIds.has(f.id))
      .reduce((sum, f) => sum + f.price, 0);
    
    const allAvailableOptions = this.activeFeatures().flatMap(f => f.options ?? []);

    const optionsCost = allAvailableOptions
      .filter(opt => selectedOptionIds.has(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);

    return mainFeaturesCost + optionsCost;
  });

  budgetDifference = computed(() => this.targetBudget() - this.totalCost());
  
  absBudgetDifference = computed(() => Math.abs(this.budgetDifference()));

  constructor() {
    this.allFeatures = {
      angular: this.mapRawFeatures(rawFeaturesData.angular),
      react: this.mapRawFeatures(rawFeaturesData.react),
      backend: this.mapRawFeatures(rawFeaturesData.backend),
      custom: [],
      infrastructure: this.mapRawFeatures(rawFeaturesData.infrastructure),
    };

    afterNextRender(() => {
      this.updateHighlight(this.activeTab());
    });

    effect(() => {
        this.updateHighlight(this.activeTab());
    });
  }

  private mapRawFeatures(raw: {id: string, name: string, description: string, price: number, icon: string, options?: TechFeatureOption[]}[]): TechFeature[] {
    return raw.map(f => ({
      id: f.id,
      name: f.name,
      description: f.description,
      price: f.price,
      iconSvg: this.sanitizer.bypassSecurityTrustHtml(`<path stroke-linecap="round" stroke-linejoin="round" d="${f.icon}" />`),
      options: f.options,
    })).sort((a,b) => a.price - b.price);
  }

  setActiveTab(tab: TechStack): void {
    this.activeTab.set(tab);
    this.selectedFeatures.set(new Set()); // Reset selections when tab changes
    this.selectedOptions.set(new Set());
  }

  private updateHighlight(tab: TechStack): void {
    let activeBtnElRef: ElementRef<HTMLButtonElement> | undefined;

    switch (tab) {
        case 'angular': activeBtnElRef = this.angularBtn(); break;
        case 'react': activeBtnElRef = this.reactBtn(); break;
        case 'backend': activeBtnElRef = this.backendBtn(); break;
        case 'custom': activeBtnElRef = this.customBtn(); break;
        case 'infrastructure': activeBtnElRef = this.infraBtn(); break;
    }

    if (activeBtnElRef) {
        const el = activeBtnElRef.nativeElement;
        this.highlightWidth.set(el.offsetWidth);
        this.highlightTransform.set(`translateX(${el.offsetLeft}px)`);
    }
  }

  toggleFeature(featureId: string): void {
    this.selectedFeatures.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
        // When deselecting a feature, also deselect its options
        const feature = this.activeFeatures().find(f => f.id === featureId);
        if (feature?.options) {
          this.selectedOptions.update(currentOptions => {
            const newOptions = new Set(currentOptions);
            feature.options.forEach(opt => newOptions.delete(opt.id));
            return newOptions;
          });
        }
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  }

  toggleOption(optionId: string): void {
    this.selectedOptions.update(currentSet => {
      const newSet = new Set(currentSet);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  }

  onBudgetChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.targetBudget.set(value);
  }

  generateBriefPrompt(): void {
    if (this.activeTab() === 'custom') {
      const description = this.customProjectControl.value;
      const budget = this.targetBudget();
      const prompt = `Gostaria de solicitar um orçamento para um projeto personalizado. Descrição: "${description}". Meu orçamento proposto é de R$${budget.toLocaleString('pt-BR')}.`;
      this.modalService.openAiBriefModal(prompt);
      return;
    }

    if (this.activeTab() === 'infrastructure') {
      const selectedFeatureIds = this.selectedFeatures();
      const selectedFeatures = this.activeFeatures().filter(f => selectedFeatureIds.has(f.id));
      if (selectedFeatures.length === 0) {
          this.modalService.openAiBriefModal(`Estou interessado em contratar serviços de infraestrutura. Meu orçamento anual alvo é de R$${this.targetBudget().toLocaleString('pt-BR')}.`);
          return;
      }
      const featureSummary = selectedFeatures.map(f => f.name).join('; ');
      const prompt = `Gostaria de solicitar um orçamento para os seguintes serviços de infraestrutura: ${featureSummary}. O custo anual estimado é de R$${this.totalCost().toLocaleString('pt-BR')} e meu orçamento anual alvo é R$${this.targetBudget().toLocaleString('pt-BR')}.`;
      this.modalService.openAiBriefModal(prompt);
      return;
    }

    const selectedFeatureIds = this.selectedFeatures();
    const selectedFeatures = this.activeFeatures().filter(f => selectedFeatureIds.has(f.id));
    
    const selectedOptionIds = this.selectedOptions();
    const allOptions = this.activeFeatures().flatMap(f => f.options ?? []);
    const selectedOptions = allOptions.filter(opt => selectedOptionIds.has(opt.id));

    const techName = this.activeTab().charAt(0).toUpperCase() + this.activeTab().slice(1);
    
    if (selectedFeatures.length === 0) {
      this.modalService.openAiBriefModal(`Estou interessado em um projeto com a tecnologia ${techName}, mas ainda não selecionei funcionalidades. Meu orçamento alvo é de R$${this.targetBudget().toLocaleString('pt-BR')}.`);
      return;
    }

    const featureSummary = selectedFeatures.map(f => {
      const relatedOptions = selectedOptions.filter(opt => f.options?.some(fo => fo.id === opt.id));
      if (relatedOptions.length > 0) {
        const optionNames = relatedOptions.map(o => o.name).join(', ');
        return `${f.name} (adicionais: ${optionNames})`;
      }
      return f.name;
    }).join('; ');

    const prompt = `Gostaria de solicitar um orçamento para um projeto ${techName} com as seguintes funcionalidades: ${featureSummary}. O custo estimado é de R$${this.totalCost().toLocaleString('pt-BR')} e meu orçamento alvo é R$${this.targetBudget().toLocaleString('pt-BR')}.`;
    
    this.modalService.openAiBriefModal(prompt);
  }
}