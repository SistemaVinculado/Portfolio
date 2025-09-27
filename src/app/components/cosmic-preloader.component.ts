import { Component, ChangeDetectionStrategy, input, ViewChild, ElementRef, AfterViewInit, OnDestroy, signal, effect } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-cosmic-preloader',
  standalone: true,
  template: `
    <div
      class="fixed inset-0 bg-[#1C1A27] z-50 flex items-center justify-center transition-opacity duration-500 ease-out"
      [class.opacity-0]="isFadingOut()"
      [class.pointer-events-none]="isFadingOut()">
      <canvas #preloaderCanvas class="absolute inset-0 w-full h-full"></canvas>
      <div 
        class="text-4xl font-bold tracking-tight text-white transition-all duration-1000 ease-in-out"
        [class.opacity-0]="!isLogoVisible()"
        [class.scale-75]="!isLogoVisible()"
        [class.blur-md]="!isLogoVisible()">
        StellarDev
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosmicPreloaderComponent implements AfterViewInit, OnDestroy {
  isLoading = input.required<boolean>();

  @ViewChild('preloaderCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private constellationPoints: Star[] = [];
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;
  private resizeAnimationId: number | null = null;

  private startTime = 0;
  private readonly constellationDuration = 700;
  private readonly glowDuration = 300;
  private readonly totalAnimationTime = 2000;

  isFadingOut = signal(false);
  isLogoVisible = signal(false);

  constructor() {
    effect(() => {
      if (!this.isLoading()) {
        setTimeout(() => {
            this.isFadingOut.set(true);
        }, this.totalAnimationTime);
      }
    });
  }
  
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    this.ctx = context;

    this.setupResizeObserver();
    this.initializeAnimation();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeAnimationId) {
      cancelAnimationFrame(this.resizeAnimationId);
    }
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      if (this.resizeAnimationId) {
        cancelAnimationFrame(this.resizeAnimationId);
      }
      this.resizeAnimationId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry || entry.contentRect.width === 0 || entry.contentRect.height === 0) return;
        this.resizeCanvas(entry.contentRect.width, entry.contentRect.height);
        this.initializeAnimation();
      });
    });
    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  private resizeCanvas(width: number, height: number): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    this.ctx.scale(dpr, dpr);
  }

  private initializeAnimation(): void {
    this.startTime = Date.now();
    this.stars = [];
    const width = this.canvasRef.nativeElement.offsetWidth;
    const height = this.canvasRef.nativeElement.offsetHeight;
    const numStars = Math.floor((width * height) / 4000);

    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: 0,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      });
    }

    // Select points for the constellation
    this.constellationPoints = this.stars.slice(0, 7).sort((a,b) => a.x - b.x);
  }

  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  private draw(): void {
    const width = this.canvasRef.nativeElement.offsetWidth;
    const height = this.canvasRef.nativeElement.offsetHeight;
    this.ctx.clearRect(0, 0, width, height);
    
    const elapsed = Date.now() - this.startTime;

    // Stars
    this.stars.forEach(star => {
      // Fade in stars
      if (star.alpha < 1) {
        star.alpha += 0.01;
      }

      // Move stars
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around screen
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      this.ctx.fill();
    });

    // Constellation
    const constellationProgress = Math.min(1, Math.max(0, (elapsed - 500) / this.constellationDuration));
    if (constellationProgress > 0) {
        this.ctx.strokeStyle = `rgba(138, 107, 147, ${constellationProgress * 0.7})`;
        this.ctx.lineWidth = 1;
        for(let i = 0; i < this.constellationPoints.length - 1; i++) {
            const p1 = this.constellationPoints[i];
            const p2 = this.constellationPoints[i+1];
            
            const totalLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            const currentLength = totalLength * constellationProgress;
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;

            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p1.x + (dx / totalLength) * currentLength, p1.y + (dy / totalLength) * currentLength);
            this.ctx.stroke();
        }
    }
    
    // Logo reveal
    if (elapsed > 1200) {
      this.isLogoVisible.set(true);
    }
    
    // Glow effect
    const glowStartTime = 1200 + this.glowDuration;
    const glowProgress = Math.min(1, Math.max(0, (elapsed - glowStartTime) / this.glowDuration));
    if (glowProgress > 0) {
        this.constellationPoints.forEach(p => {
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 15 * glowProgress);
            gradient.addColorStop(0, `rgba(192, 132, 252, ${0.5 * (1 - glowProgress)})`);
            gradient.addColorStop(1, 'rgba(192, 132, 252, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(p.x - 20, p.y - 20, 40, 40);
        });
    }

  }
}