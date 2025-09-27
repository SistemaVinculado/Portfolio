import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject, Renderer2 } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
}

@Component({
  selector: 'app-interactive-background',
  standalone: true,
  template: `<canvas #bgCanvas class="fixed top-0 left-0 w-full h-full -z-10 opacity-70 dark:opacity-100 transition-opacity duration-500"></canvas>`,
})
export class InteractiveBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private platformId = inject(PLATFORM_ID);
  // Fix: Explicitly type the injected `DOCUMENT` as `Document`.
  private document: Document = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;
  private mouse = { x: -1000, y: -1000, radius: 150 };
  private mouseMoveListener!: () => void;
  private mouseOutListener!: () => void;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvasRef.nativeElement;
      const context = canvas.getContext('2d');
      if (!context) return;
      this.ctx = context;

      this.resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];
        if (!entry || entry.contentRect.width === 0) return;
        this.resizeCanvas();
        this.initializeParticles();
      });
      this.resizeObserver.observe(canvas);
      
      this.resizeCanvas();
      this.initializeParticles();
      this.addEventListeners();
      this.animate();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver?.disconnect();
    this.removeEventListeners();
  }
  
  private addEventListeners(): void {
      this.mouseMoveListener = this.renderer.listen('window', 'mousemove', (event: MouseEvent) => {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
      });
      this.mouseOutListener = this.renderer.listen('window', 'mouseout', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
  }
  
  private removeEventListeners(): void {
      if (this.mouseMoveListener) this.mouseMoveListener();
      if (this.mouseOutListener) this.mouseOutListener();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private initializeParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000);
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.2 + 0.5,
      });
    }
  }

  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const isDark = this.document.documentElement.classList.contains('dark');
    
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(41, 38, 57, 0.5)';
    const lineColor = isDark ? 'rgba(160, 135, 167, 0.15)' : 'rgba(138, 107, 147, 0.15)';
    const mouseLineColor = isDark ? 'rgba(192, 132, 252, 0.2)' : 'rgba(138, 107, 147, 0.2)';

    this.ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particleColor;
      this.ctx.fill();
    });

    const dpr = window.devicePixelRatio || 1;
    const mouseX = this.mouse.x * dpr;
    const mouseY = this.mouse.y * dpr;
    const mouseRadius = this.mouse.radius * dpr;

    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      // Connect to mouse
      const distToMouse = Math.sqrt((p1.x - mouseX)**2 + (p1.y - mouseY)**2);
      if (distToMouse < mouseRadius) {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.strokeStyle = mouseLineColor;
        this.ctx.lineWidth = 1 - distToMouse / mouseRadius;
        this.ctx.stroke();
      }

      // Connect to other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);

        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = lineColor;
          this.ctx.lineWidth = 1 - dist / 120;
          this.ctx.stroke();
        }
      }
    }
  }
}
