import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-availability-marquee',
  standalone: true,
  templateUrl: './availability-marquee.component.html',
  styleUrls: ['./availability-marquee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvailabilityMarqueeComponent {
  // FIX: Explicitly type injected services to avoid 'unknown' type errors.
  private languageService: LanguageService = inject(LanguageService);

  private baseMessages = computed(() => [
    this.languageService.get('marquee.msg1')(),
    this.languageService.get('marquee.msg2')(),
    this.languageService.get('marquee.msg3')(),
    this.languageService.get('marquee.msg4')(),
  ]);

  // Repeat the messages to fill the marquee width sufficiently
  marqueeMessages = computed(() => {
    const messages = this.baseMessages();
    // Filter out any keys that haven't been translated yet
    const validMessages = messages.filter(m => !m.startsWith('marquee.'));
    if (validMessages.length === 0) return [];
    
    const repetitions = 3; // 4 messages * 3 reps = 12 total items. Should be enough.
    return Array(repetitions).fill(validMessages).flat();
  });
}
