import { Component, ChangeDetectionStrategy, input, signal, effect, inject, computed } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { DataService } from '../data.service';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, AnimateOnScrollDirective],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private dataService = inject(DataService);
  private textContentService = inject(TextContentService);
  
  t(key: string, params?: { [key: string]: any }): string {
    return this.textContentService.getWithParams(key, params);
  }
  
  initialMessage = input<string | null>(null);
  
  contactInfo = this.dataService.contactInfo;
  socialLinks = this.dataService.socialLinks;
  services = this.dataService.services;

  formStatus = signal<'idle' | 'submitting' | 'success'>('idle');
  submittedName = signal('');
  
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl(''),
    inquiryType: new FormControl('project', Validators.required),
    serviceOfInterest: new FormControl('', Validators.required),
    budget: new FormControl('', Validators.required),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  budgetOptions = computed(() => {
    return [
      { value: '<100k', label: '< R$100.000' },
      { value: '100k-300k', label: 'R$100.000 - R$300.000' },
      { value: '>300k', label: 'R$300.000+' },
    ];
  });

  expectations = [
    {
      key: 'initial_contact',
      iconPath: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      key: 'suitability_consultation',
      iconPath: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.482c.075-.015.15-.03.225-.045m-3.975 0a6.017 6.017 0 01-2.225-.045M12 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z'
    },
    {
      key: 'architectural_blueprint',
      iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
    }
  ];

  constructor() {
    effect(() => {
      const message = this.initialMessage();
      if (message) {
        this.contactForm.patchValue({ message });
      }
    });

    // Add conditional validators based on the inquiry type
    this.contactForm.get('inquiryType')?.valueChanges.subscribe(type => {
      const serviceControl = this.contactForm.get('serviceOfInterest');
      const budgetControl = this.contactForm.get('budget');

      if (type === 'project') {
        serviceControl?.setValidators(Validators.required);
        budgetControl?.setValidators(Validators.required);
      } else {
        serviceControl?.clearValidators();
        budgetControl?.clearValidators();
        serviceControl?.setValue('');
        budgetControl?.setValue('');
      }
      serviceControl?.updateValueAndValidity();
      budgetControl?.updateValueAndValidity();
    });
  }

  submitForm(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formStatus.set('submitting');
    this.submittedName.set(this.contactForm.get('name')?.value || '');

    const formData = this.contactForm.value;
    const recipient = 'membership.actuallydev@gmail.com';
    
    const inquiryTypeText = formData.inquiryType === 'project' ? 'Comissão' : 'Geral';
      
    const subject = `[Consulta de Comissão StellarDev] ${inquiryTypeText} - ${formData.name}`;

    let body = "Nova Consulta de Comissão\n";
    body += "========================\n\n";
    body += `Nome: ${formData.name}\n`;
    body += `Email: ${formData.email}\n`;
    if (formData.company) {
      body += `Empresa: ${formData.company}\n`;
    }
    body += `Tipo de Consulta: ${formData.inquiryType === 'project' ? 'Nova Comissão' : 'Pergunta Geral'}\n`;
    
    if (formData.inquiryType === 'project') {
        const selectedService = this.services().find(s => s.id === formData.serviceOfInterest);
        const serviceTitle = selectedService ? selectedService.title : 'N/A';
        body += `Serviço de Interesse: ${serviceTitle}\n`;
        const selectedBudget = this.budgetOptions().find(opt => opt.value === formData.budget);
        const budgetLabel = selectedBudget ? selectedBudget.label : formData.budget;
        body += `Orçamento Estimado: ${budgetLabel}\n`;
    }

    body += `\n--- Mensagem ---\n\n${formData.message}\n`;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the user's default mail client.
    window.location.href = mailtoLink;
    
    // Assume the user sent the email and show a success message.
    // Use a short delay to allow the mail client to open.
    setTimeout(() => {
      this.formStatus.set('success');
    }, 500);
  }

  resetForm(): void {
    this.contactForm.reset({
      name: '',
      email: '',
      company: '',
      inquiryType: 'project',
      serviceOfInterest: '',
      budget: '',
      message: ''
    });
    this.formStatus.set('idle');
    this.submittedName.set('');
  }
}
