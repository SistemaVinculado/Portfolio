import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  life: number; // 1 (visible) to 0 (gone)
}

@Component({
  selector: 'app-menu-starfield',
  standalone: true,
  template: `<canvas #starfieldCanvas class="absolute inset-0 w-full h-full opacity-20 dark:opacity-30 pointer-events-none"></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuStarfieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starfieldCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx: CanvasRenderingContext2D | null = null;
  private stars: Star[] = [];
  private shootingStars: ShootingStar[] = [];
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    this.ctx = context;

    this.setupResizeObserver();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry || entry.contentRect.width === 0) return;
      this.resizeCanvas(entry.contentRect.width, entry.contentRect.height);
      this.initializeStars();
      if (!this.animationFrameId) {
          this.animate();
      }
    });
    this.resizeObserver.observe(this.canvasRef.nativeElement);
  }

  private resizeCanvas(width: number, height: number): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    this.ctx?.scale(dpr, dpr);
  }

  private initializeStars(): void {
    if (!this.canvasRef) return;
    const width = this.canvasRef.nativeElement.offsetWidth;
    const height = this.canvasRef.nativeElement.offsetHeight;
    const numStars = 100;
    this.stars = [];
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
      });
    }
    this.shootingStars = [];
  }

  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  private draw(): void {
    if (!this.ctx || !this.canvasRef) return;
    const width = this.canvasRef.nativeElement.offsetWidth;
    const height = this.canvasRef.nativeElement.offsetHeight;
    this.ctx.clearRect(0, 0, width, height);
    
    this.ctx.fillStyle = '#FFFFFF';
    
    this.stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.updateAndDrawShootingStars(width, height);
  }

  private updateAndDrawShootingStars(width: number, height: number): void {
    if (!this.ctx) return;
    
    // Occasionally create a new shooting star
    if (Math.random() < 0.02 && this.shootingStars.length < 3) {
      this.shootingStars.push({
        x: Math.random() * width,
        y: 0,
        len: Math.random() * 40 + 10,
        speed: Math.random() * 5 + 5,
        life: 1,
      });
    }

    // Update and draw existing ones
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.speed;
      s.y += s.speed;
      s.life -= 0.01;

      if (s.life <= 0 || s.x > width || s.y > height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(s.x - s.len, s.y - s.len);
      this.ctx.lineWidth = 1.5;
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${s.life * 0.5})`;
      this.ctx.stroke();
    }
  }
}