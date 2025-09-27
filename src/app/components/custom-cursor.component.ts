import { Component, ChangeDetectionStrategy, PLATFORM_ID, inject, Renderer2, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    <div #cursorDot class="cursor-dot" [hidden]="isTouchDevice"></div>
    <div #cursorRing class="cursor-ring" [hidden]="isTouchDevice"></div>
  `,
  styleUrls: ['./custom-cursor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cursorDot') private dot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing') private ring!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);
  
  private mouseMoveListener!: () => void;
  private mouseEnterListener!: () => void;
  private mouseLeaveListener!: () => void;
  private mouseDownListener!: () => void;
  private mouseUpListener!: () => void;

  private dotX = 0;
  private dotY = 0;
  private ringX = 0;
  private ringY = 0;
  private animationFrameId: number | null = null;
  
  isTouchDevice = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isTouchDevice = 'ontouchstart' in window;
    }
  }
  
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.isTouchDevice) {
      this.addEventListeners();
      this.animate();
    }
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private addEventListeners(): void {
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.dotX = e.clientX;
      this.dotY = e.clientY;
      
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input[type="submit"], .cursor-pointer') || target.closest('a, button, input[type="submit"], .cursor-pointer')) {
        this.renderer.addClass(this.ring.nativeElement, 'grow');
      } else {
        this.renderer.removeClass(this.ring.nativeElement, 'grow');
      }
    });

    this.mouseEnterListener = this.renderer.listen('document', 'mouseenter', () => {
        this.renderer.setStyle(this.dot.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.ring.nativeElement, 'opacity', '1');
    });

    this.mouseLeaveListener = this.renderer.listen('document', 'mouseleave', () => {
        this.renderer.setStyle(this.dot.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.ring.nativeElement, 'opacity', '0');
    });
    
    this.mouseDownListener = this.renderer.listen('document', 'mousedown', () => {
        this.renderer.addClass(this.ring.nativeElement, 'small');
    });

    this.mouseUpListener = this.renderer.listen('document', 'mouseup', () => {
        this.renderer.removeClass(this.ring.nativeElement, 'small');
    });
  }
  
  private removeEventListeners(): void {
    if (this.mouseMoveListener) this.mouseMoveListener();
    if (this.mouseEnterListener) this.mouseEnterListener();
    if (this.mouseLeaveListener) this.mouseLeaveListener();
    if (this.mouseDownListener) this.mouseDownListener();
    if (this.mouseUpListener) this.mouseUpListener();
  }
  
  private animate = () => {
    // Using a simple lerp for smooth following
    this.ringX += (this.dotX - this.ringX) * 0.2;
    this.ringY += (this.dotY - this.ringY) * 0.2;

    this.renderer.setStyle(this.dot.nativeElement, 'transform', `translate(${this.dotX}px, ${this.dotY}px)`);
    this.renderer.setStyle(this.ring.nativeElement, 'transform', `translate(${this.ringX - this.ring.nativeElement.offsetWidth / 2}px, ${this.ringY - this.ring.nativeElement.offsetHeight / 2}px)`);
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}
