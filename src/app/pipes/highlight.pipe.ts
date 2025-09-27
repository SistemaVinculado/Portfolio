import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  transform(text: string, searchTerm: string): string | SafeHtml {
    if (!searchTerm || !text) {
      return text;
    }

    // Escape special characters in search term for RegExp
    const safeSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeSearchTerm})`, 'gi');
    
    const highlightedText = text.replace(regex, `<mark class="bg-purple-200 dark:bg-purple-700/50 text-[#292639] dark:text-white rounded-md px-1 py-0.5">$1</mark>`);
    
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}