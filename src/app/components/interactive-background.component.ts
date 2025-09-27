import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
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
  private document: Document = inject(DOCUMENT);
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;

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
      this.animate();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver?.disconnect();
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
    // Reduced particle density for a subtler effect
    const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 20000);
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.1, // Slower velocity
        vy: (Math.random() - 0.5) * 0.1, // Slower velocity
        radius: Math.random() * 1.0 + 0.2, // Smaller radius
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
    
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(41, 38, 57, 0.4)';

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
  }
}
