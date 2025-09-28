import { Injectable, inject, effect, signal } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { TextContentService } from './text-content.service';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;
  private textService = inject(TextContentService);

  private systemInstruction = this.textService.get('geminiSystemInstruction');
  public isConfigured = signal(false);

  constructor() {
    let apiKey: string | undefined;
    // Safely check for process.env.API_KEY, which is not available in browser environments like Firebase Hosting.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        apiKey = process.env.API_KEY;
    }

    if (!apiKey) {
      console.warn('Gemini API key is not configured. AI Buddy will be disabled.');
      this.isConfigured.set(false);
    } else {
      this.ai = new GoogleGenAI({ apiKey });
      this.isConfigured.set(true);
    }

    effect(() => {
      // This effect will run whenever the language (or any text content) changes, resetting the chat.
      this.systemInstruction(); // Establish dependency
      this.resetChat();
    });
  }

  private resetChat(): void {
    this.chat = null;
  }

  private getChatSession(): Chat {
    if (!this.ai) {
      throw new Error('Gemini service is not configured.');
    }
    if (!this.chat) {
      this.chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: this.systemInstruction(),
        },
      });
    }
    return this.chat;
  }

  async startConversation(): Promise<AsyncGenerator<GenerateContentResponse>> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API Key is not configured. Cannot start conversation.');
    }
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message: "Introduce yourself based on your system instructions." });
    return result;
  }

  async sendMessage(message: string): Promise<AsyncGenerator<GenerateContentResponse>> {
    if (!this.isConfigured()) {
      throw new Error('Gemini API Key is not configured. Cannot send message.');
    }
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message });
    return result;
  }
}
