import { Injectable, signal } from '@angular/core';
import { ServiceOffering } from '../models/service-offering.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  readonly isAiBriefModalOpen = signal(false);
  readonly initialBriefText = signal<string>('');

  openAiBriefModal(initialText: string = ''): void {
    this.initialBriefText.set(initialText);
    this.isAiBriefModalOpen.set(true);
  }

  requestQuote(service: ServiceOffering): void {
    this.openAiBriefModal(service.quotePrompt);
  }

  closeAiBriefModal(): void {
    this.isAiBriefModalOpen.set(false);
  }
}
