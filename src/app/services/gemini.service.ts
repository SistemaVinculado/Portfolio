import { Injectable, inject, effect } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { TextContentService } from './text-content.service';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;
  private textService = inject(TextContentService);

  private systemInstruction = this.textService.get('geminiSystemInstruction');

  constructor() {
    // This assumes process.env.API_KEY is available in the execution environment,
    // as per the project's setup instructions.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY not found in environment variables.');
      throw new Error('API_KEY is not configured.');
    }
    this.ai = new GoogleGenAI({ apiKey });

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
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message: "Introduce yourself based on your system instructions." });
    return result;
  }

  async sendMessage(message: string): Promise<AsyncGenerator<GenerateContentResponse>> {
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message });
    return result;
  }
}
