import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
}

@Component({
  selector: 'app-generative-art',
  standalone: true,
  templateUrl: './generative-art.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerativeArtComponent implements AfterViewInit, OnDestroy {
  @ViewChild('artCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private platformId = inject(PLATFORM_ID);
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
    const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 10000);
    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }
  }

  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const isDark = document.documentElement.classList.contains('dark');
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(41, 38, 57, 0.7)';
    const lineColor = isDark ? 'rgba(160, 135, 167, 0.2)' : 'rgba(138, 107, 147, 0.2)';

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

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dist = Math.sqrt(
          (this.particles[i].x - this.particles[j].x) ** 2 +
          (this.particles[i].y - this.particles[j].y) ** 2
        );

        if (dist < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = lineColor;
          this.ctx.lineWidth = 1 - dist / 100;
          this.ctx.stroke();
        }
      }
    }
  }
}
