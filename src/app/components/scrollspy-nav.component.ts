import { Component, ChangeDetectionStrategy, input, signal, inject, AfterViewInit, OnDestroy, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { NavLink } from '../models';

interface SectionPosition {
  id: string;
  label: string;
  percent: number;
  // The scrollY position where this section's title is centered in the viewport
  targetScrollTop: number;
}

@Component({
  selector: 'app-scrollspy-nav',
  standalone: true,
  templateUrl: './scrollspy-nav.component.html',
  styleUrls: ['./scrollspy-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyNavComponent implements AfterViewInit, OnDestroy {
  navLinks = input.required<NavLink[]>();

  private platformId = inject(PLATFORM_ID);
  private document: Document = inject(DOCUMENT);
  private renderer = inject(Renderer2);

  scrollProgress = signal(0);
  activeSectionId = signal<string | null>(null);
  sectionPositions = signal<SectionPosition[]>([]);
  passedSectionIds = signal<Set<string>>(new Set());

  private scrollListener!: () => void;
  private resizeListener!: () => void;
  private observer!: IntersectionObserver;
  private resizeTimeout: number | undefined;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.calculateSectionPositions();
        this.updatePassedSections(); // Set initial passed state on load
      }, 100);
      
      this.scrollListener = this.renderer.listen('window', 'scroll', () => {
        this.updateScrollProgress();
        this.updatePassedSections();
      });

      this.resizeListener = this.renderer.listen('window', 'resize', () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(() => {
          this.calculateSectionPositions();
          this.updatePassedSections();
        }, 200);
      });

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSectionId.set(entry.target.id);
          }
        });
      }, { rootMargin: '-50% 0px -50% 0px' }); // Triggers when section is in the vertical center.

      this.navLinks().forEach(link => {
        const element = this.document.getElementById(link.href.substring(1));
        if (element) {
          this.observer.observe(element);
        }
      });
      
      this.updateScrollProgress(); // Initial check
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener) this.scrollListener();
    if (this.resizeListener) this.resizeListener();
    if (this.observer) this.observer.disconnect();
    clearTimeout(this.resizeTimeout);
  }

  private calculateSectionPositions(): void {
    const scrollHeight = this.document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const positions: SectionPosition[] = this.navLinks().map(link => {
      const element = this.document.getElementById(link.href.substring(1));
      if (element) {
        // Find the h2 title within the section for more accurate positioning.
        const titleElement = element.querySelector('h2');
        const targetElement = titleElement || element; // Fallback to section if no h2

        const elementRect = targetElement.getBoundingClientRect();
        const elementCenter = elementRect.top + window.scrollY + (elementRect.height / 2);
        const viewportCenter = window.innerHeight / 2;
        const targetScrollTop = Math.max(0, elementCenter - viewportCenter);
        
        const percent = targetScrollTop / scrollHeight;
        return { 
          id: link.href.substring(1), 
          label: link.label, 
          percent: Math.min(1, percent),
          targetScrollTop: targetScrollTop 
        };
      }
      return null;
    }).filter((p): p is SectionPosition => p !== null);

    this.sectionPositions.set(positions);
  }

  private updateScrollProgress(): void {
    const scrollHeight = this.document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
        this.scrollProgress.set(0);
        return;
    }
    const scrollTop = window.scrollY;
    const progress = scrollTop / scrollHeight;
    this.scrollProgress.set(progress);
  }

  private updatePassedSections(): void {
    const currentScroll = window.scrollY;
    
    this.passedSectionIds.update(currentSet => {
      const newSet = new Set<string>();
      this.sectionPositions().forEach(section => {
        // A section is "passed" if the user has scrolled beyond the point
        // where its title is centered.
        if (currentScroll >= section.targetScrollTop) {
          newSet.add(section.id);
        }
      });
      
      // Optimization: only update the signal if the set's contents have actually changed.
      if (newSet.size === currentSet.size && [...newSet].every(id => currentSet.has(id))) {
          return currentSet;
      }
      return newSet;
    });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = this.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}