import { Component, ChangeDetectionStrategy, output, inject, signal, computed, effect, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GeminiService } from '../services/gemini.service';
import { ChatMessage } from '../models';
import { GenerativeArtComponent } from './generative-art.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-ai-buddy',
  standalone: true,
  imports: [GenerativeArtComponent],
  templateUrl: './ai-buddy.component.html',
  styleUrls: ['./ai-buddy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiBuddyComponent {
  close = output<void>();
  
  @ViewChild('chatContainer') private chatContainer!: ElementRef<HTMLDivElement>;

  private geminiService = inject(GeminiService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);
  private t = this.languageService.get.bind(this.languageService);

  private nextMessageId = 0;
  messages = signal<ChatMessage[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  displayMessages = computed(() => {
    return this.messages().map(msg => ({
      ...msg,
      htmlContent: this.markdownToHtml(msg.content)
    }));
  });

  constructor() {
    this.startConversation();

    effect(() => {
      // Trigger effect when messages change
      this.messages();
      if (isPlatformBrowser(this.platformId)) {
        // Defer scroll to after the view has been updated
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }
  
  private async startConversation() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const stream = await this.geminiService.startConversation();
      this.messages.set([{ id: this.nextMessageId++, role: 'model', content: '' }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        this.messages.update(msgs => {
          const lastMsg = msgs[msgs.length - 1];
          lastMsg.content += text;
          return [...msgs];
        });
      }
    } catch (e) {
      console.error(e);
      this.error.set(this.t('aiBuddy.connectionError')());
      this.messages.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  async onSendMessage(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input[name="prompt"]') as HTMLInputElement;
    const prompt = input.value.trim();

    if (!prompt || this.isLoading()) {
      return;
    }

    this.messages.update(msgs => [...msgs, { id: this.nextMessageId++, role: 'user', content: prompt }]);
    input.value = '';
    this.isLoading.set(true);
    this.error.set(null);

    try {
        const stream = await this.geminiService.sendMessage(prompt);
        this.messages.update(msgs => [...msgs, { id: this.nextMessageId++, role: 'model', content: '' }]);

        for await (const chunk of stream) {
            const text = chunk.text;
            this.messages.update(msgs => {
                const lastMsg = msgs[msgs.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.content += text;
                }
                return [...msgs];
            });
        }
    } catch (e) {
        console.error(e);
        this.messages.update(msgs => {
            const lastMsg = msgs[msgs.length - 1];
            if (lastMsg.role === 'model' && lastMsg.content === '') {
                msgs.pop();
            }
            return [...msgs, { id: this.nextMessageId++, role: 'model', content: this.t('aiBuddy.streamError')(), isError: true }];
        });
    } finally {
        this.isLoading.set(false);
    }
  }

  private markdownToHtml(text: string): SafeHtml {
    if (!text) return this.sanitizer.bypassSecurityTrustHtml('');
    
    // A very simple and safe markdown converter.
    // It is not a full parser but handles the expected format from the AI.
    const html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>')
      .replace(/<br><li>/g, '<li>')
      .replace(/<\/li><br>/g, '</li>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private scrollToBottom(): void {
    if (this.chatContainer?.nativeElement) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
