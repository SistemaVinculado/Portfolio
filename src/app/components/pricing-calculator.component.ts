import { Component, ChangeDetectionStrategy, output, signal, computed, OnDestroy, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../services/language.service';

interface CipherFacet {
  name: 'Architectural Purity' | 'Kinetic Grace' | 'Semantic Signature';
  icon: string;
}

@Component({
  selector: 'app-pricing-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, AnimateOnScrollDirective, TranslatePipe],
  templateUrl: './pricing-calculator.component.html',
  styleUrls: ['./pricing-calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingCalculatorComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private languageService = inject(LanguageService);
  
  // Make these public for template access
  calculatorScopes = this.dataService.calculatorScopes;
  calculatorComplexities = this.dataService.calculatorComplexities;
  
  scrollTo = output<{ event: Event; href: string; message: string }>();
  
  calculatorForm!: FormGroup;
  private formSubscription!: Subscription;
  private formValue = signal<any>({});

  // Constants for SVG progress bar
  readonly circumference = 2 * Math.PI * 45; // r = 45
  
  private readonly cipherFacets: { [key: string]: CipherFacet } = {
    'Purity': { name: 'Architectural Purity', icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6M9 20.25h6M4.5 6.75h.75v.75H4.5v-.75zm.75 4.5h-.75v-.75h.75v.75zm-.75 4.5h.75v.75H4.5v-.75zm14.25-8.25h-.75v-.75h.75v.75zm-.75 4.5h.75v.75h-.75v-.75zm.75 4.5h-.75v-.75h.75v.75z' },
    'Grace': { name: 'Kinetic Grace', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
    'Signature': { name: 'Semantic Signature', icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182-3.182m3.182 0l-3.182 3.182' },
  };
  
  currencyInfo = computed(() => {
    if (this.languageService.currentLanguage() === 'pt-BR') {
      return { symbol: 'R$', locale: 'pt-BR' };
    }
    return { symbol: '$', locale: 'en-US' };
  });
  
  fullServiceDetails = computed(() => {
    const calcServices = this.dataService.calculatorServices();
    const allServices = this.dataService.services();
    const isPtBr = this.languageService.currentLanguage() === 'pt-BR';
    
    return allServices
      .map(service => {
        const calcData = calcServices.find(cs => cs.id === service.id);
        return { 
          ...service, 
          basePrice: isPtBr ? (calcData?.basePriceBRL ?? 0) : (calcData?.basePrice ?? 0), 
          enabled: !!calcData 
        };
      })
      .filter(s => s.enabled);
  });
  
  selectedScope = computed(() => this.calculatorScopes()[this.formValue().scope ?? 1]);
  selectedComplexity = computed(() => this.calculatorComplexities()[this.formValue().complexity ?? 1]);
  
  estimatedPrice = computed(() => this.calculatePrice());
  
  discountInfo = computed(() => {
    const price = this.estimatedPrice();
    if (price.min <= 0) {
      return { percentage: 0, min: 0, max: 0, originalMin: 0, originalMax: 0 };
    }

    const isPtBr = this.languageService.currentLanguage() === 'pt-BR';
    const usdThresholdStart = 5000;
    const usdThresholdEnd = 100000;
    const brlThresholdStart = 20000;
    const brlThresholdEnd = 350000;
    
    const start = isPtBr ? brlThresholdStart : usdThresholdStart;
    const end = isPtBr ? brlThresholdEnd : usdThresholdEnd;
    const maxDiscount = 10;
    const minDiscount = 1;

    let percentage: number;
    if (price.min <= start) {
        percentage = maxDiscount;
    } else if (price.min >= end) {
        percentage = minDiscount;
    } else {
        const progress = (price.min - start) / (end - start);
        percentage = maxDiscount - progress * (maxDiscount - minDiscount);
    }
    
    percentage = Math.round(percentage);

    if(percentage <= minDiscount) {
        return { percentage: 0, min: price.min, max: price.max, originalMin: price.min, originalMax: price.max };
    }

    const discountMultiplier = 1 - (percentage / 100);
    const rounding = isPtBr ? 1000 : 100;
    
    const discountedMin = Math.round((price.min * discountMultiplier) / rounding) * rounding;
    const discountedMax = Math.round((price.max * discountMultiplier) / rounding) * rounding;
    
    return {
      percentage: percentage,
      min: discountedMin,
      max: discountedMax,
      originalMin: price.min,
      originalMax: price.max
    };
  });

  estimatedTimeline = computed(() => {
    const price = this.calculatePrice().min;
    if (price === 0) return { min: 0, max: 0 };
    const baseWeeks = 4;
    const weeksPer10k = (this.languageService.currentLanguage() === 'pt-BR') ? 1 : 2; // Different timeline scaling for BRL
    const divisor = (this.languageService.currentLanguage() === 'pt-BR') ? 50000 : 10000;
    const calculatedWeeks = baseWeeks + (price / divisor) * weeksPer10k;
    const minWeeks = Math.max(baseWeeks, Math.round(calculatedWeeks * 0.8));
    const maxWeeks = Math.round(calculatedWeeks * 1.2);
    return { min: minWeeks, max: maxWeeks };
  });

  complexityScore = computed(() => {
    const formVal = this.formValue();
    if (!formVal || !formVal.services) return 0;

    const servicePoints = this.fullServiceDetails().reduce((acc, service) => {
      if (formVal.services[service.id as keyof typeof formVal.services]) {
        // Normalize base price to a point system (e.g., every $750 USD = 1 point)
        const pointDivisor = (this.languageService.currentLanguage() === 'pt-BR') ? 3750 : 750;
        return acc + (service.basePrice / pointDivisor);
      }
      return acc;
    }, 0);
    
    const scopeMultiplier = this.selectedScope()?.multiplier ?? 1;
    const complexityMultiplier = this.selectedComplexity()?.multiplier ?? 1;

    const score = servicePoints * scopeMultiplier * complexityMultiplier;
    return Math.min(100, Math.round(score));
  });

  recommendedCipherFocus = computed<CipherFacet[]>(() => {
    const formVal = this.formValue();
    if (!formVal || !formVal.services || this.complexityScore() === 0) return [];
    
    const focusSet = new Set<CipherFacet>();
    
    const services = formVal.services;

    if (services['angular_ent'] || services['cloud'] || services['mobile_app'] || services['arch_audit']) {
        focusSet.add(this.cipherFacets['Purity']);
    }
    if (services['ui_ux'] || services['react_spa'] || services['mobile_app'] || services['landing_page'] || services['brand_sprint']) {
        focusSet.add(this.cipherFacets['Grace']);
    }
    if (services['static_site'] || services['headless_cms'] || services['ui_ux'] || services['landing_page']) {
        focusSet.add(this.cipherFacets['Signature']);
    }
    
    if (focusSet.size === 0) {
        return [this.cipherFacets['Purity'], this.cipherFacets['Grace'], this.cipherFacets['Signature']];
    }
    
    return Array.from(focusSet);
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

    const rounding = this.languageService.currentLanguage() === 'pt-BR' ? 1000 : 100;

    const minPrice = Math.round((basePrice * scopeMultiplier * complexityMultiplier) / rounding) * rounding;
    const maxPrice = Math.round((minPrice * 1.5) / rounding) * rounding;
    
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
    const discount = this.discountInfo();
    const timeline = this.estimatedTimeline();
    const cipherFocus = this.recommendedCipherFocus().map(f => f.name).join(', ');
    const currency = this.currencyInfo();
    const isPtBr = this.languageService.currentLanguage() === 'pt-BR';

    let message: string;

    if (isPtBr) {
      message = "Usei o Projeto da Comissão e estou interessado(a) em uma consulta formal.\n\n---\n";
      message += `Disciplinas Arquiteturais: ${selectedServices || 'Nenhuma'}\n`;
      message += `Escala da Comissão: ${scope}\n`;
      message += `Complexidade Arquitetural: ${complexity}\n`;
    } else {
      message = "I've used the Commission Blueprint and I'm interested in a formal consultation.\n\n---\n";
      message += `Architectural Disciplines: ${selectedServices || 'None'}\n`;
      message += `Commission Scale: ${scope}\n`;
      message += `Architectural Complexity: ${complexity}\n`;
    }
    
    if (discount.percentage > 0) {
      const minDiscounted = discount.min.toLocaleString(currency.locale);
      const maxDiscounted = discount.max.toLocaleString(currency.locale);
      const originalMin = discount.originalMin.toLocaleString(currency.locale);
      const originalMax = discount.originalMax.toLocaleString(currency.locale);

      if (isPtBr) {
        message += `Investimento Original: ${currency.symbol}${originalMin} - ${currency.symbol}${originalMax}\n`;
        message += `Investimento com Desconto (${discount.percentage}%): ${currency.symbol}${minDiscounted} - ${currency.symbol}${maxDiscounted}\n`;
      } else {
        message += `Original Investment: ${currency.symbol}${originalMin} - ${currency.symbol}${originalMax}\n`;
        message += `Investment with Discount (${discount.percentage}%): ${currency.symbol}${minDiscounted} - ${currency.symbol}${maxDiscounted}\n`;
      }
    } else {
      const minPrice = price.min.toLocaleString(currency.locale);
      const maxPrice = price.max.toLocaleString(currency.locale);
       if (isPtBr) {
        message += `Faixa de Investimento Estimada: ${currency.symbol}${minPrice} - ${currency.symbol}${maxPrice}\n`;
      } else {
        message += `Estimated Investment Range: ${currency.symbol}${minPrice} - ${currency.symbol}${maxPrice}\n`;
      }
    }
    
    if (isPtBr) {
      message += `Cronograma Estimado: ${timeline.min} - ${timeline.max} semanas\n---\n\n`;
      message += "Gostaria de discutir este projeto em mais detalhes.";
    } else {
      message += `Estimated Timeline: ${timeline.min} - ${timeline.max} weeks\n---\n\n`;
      message += "I would like to discuss this blueprint in more detail.";
    }

    return message;
  }
}
