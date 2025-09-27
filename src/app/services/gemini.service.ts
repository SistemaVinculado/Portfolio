import { Injectable } from '@angular/core';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    // This assumes process.env.API_KEY is available in the execution environment,
    // as per the project's setup instructions.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY not found in environment variables.');
      throw new Error('API_KEY is not configured.');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  private getChatSession(): Chat {
    if (!this.chat) {
      this.chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are an expert project architect at an elite digital agency called StellarDev. Your role is to help potential clients brainstorm project ideas.
            - Be professional, encouraging, and creative.
            - When a user gives you an idea, flesh it out.
            - Break down the idea into 3-5 key features.
            - Suggest a potential technology stack (e.g., Angular for frontend, Node.js for backend, AWS for cloud).
            - Keep your responses concise and well-structured, using markdown for lists (using hyphens) and bolding (using asterisks).
            - Do not use markdown headers (e.g., #, ##).
            - Start the conversation by introducing yourself and asking how you can help.`,
        },
      });
    }
    return this.chat;
  }

  async startConversation(): Promise<AsyncGenerator<GenerateContentResponse>> {
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message: "Introduce yourself." });
    return result;
  }

  async sendMessage(message: string): Promise<AsyncGenerator<GenerateContentResponse>> {
    const chat = this.getChatSession();
    const result = await chat.sendMessageStream({ message });
    return result;
  }
}
