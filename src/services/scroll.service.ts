import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  scrollToElementById(id: string): void {
    // If we're not on the homepage, navigate there first, then scroll.
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        // A brief delay to ensure the home page component is rendered before scrolling
        setTimeout(() => this.doScroll(id), 100);
      });
    } else {
      this.doScroll(id);
    }
  }

  private doScroll(id: string): void {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
