import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-code-matrix',
  standalone: true,
  template: `<canvas #matrixCanvas class="absolute inset-0 w-full h-full"></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeMatrixComponent implements AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;
  private resizeAnimationId: number | null = null;

  private characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()';
  private fontSize = 16;
  private columns = 0;
  private drops: number[] = [];
  
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
        console.error('Failed to get 2D rendering context for matrix.');
        return;
    }
    this.ctx = context;

    this.resizeObserver = new ResizeObserver(entries => {
        if (this.resizeAnimationId) {
            cancelAnimationFrame(this.resizeAnimationId);
        }
        this.resizeAnimationId = requestAnimationFrame(() => {
            const entry = entries[0];
            if (!entry || entry.contentRect.width === 0 || entry.contentRect.height === 0) return;
            const { width, height } = entry.contentRect;
            this.resizeCanvas(width, height);
            this.initializeMatrix();
        });
    });
    this.resizeObserver.observe(canvas);
    
    // Initial setup
    this.resizeCanvas(canvas.offsetWidth, canvas.offsetHeight);
    this.initializeMatrix();
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

  private resizeCanvas(width: number, height: number): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = width;
    canvas.height = height;
  }
  
  private initializeMatrix(): void {
    if (!this.canvasRef?.nativeElement) return;
    this.columns = this.canvasRef.nativeElement.width / this.fontSize;
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
        this.drops[i] = 1;
    }
  }
  
  private draw = () => {
    if (!this.canvasRef?.nativeElement) return;
    // Semi-transparent background for the fading trail effect
    // Using the dark theme's background color for better integration
    this.ctx.fillStyle = 'rgba(28, 26, 39, 0.05)'; 
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    // The purple color from the theme
    this.ctx.fillStyle = '#8A6B93';
    this.ctx.font = `${this.fontSize}px monospace`;
    
    for (let i = 0; i < this.drops.length; i++) {
        const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
        
        // Reset drop to the top randomly to create a staggered effect
        if (this.drops[i] * this.fontSize > this.canvasRef.nativeElement.height && Math.random() > 0.975) {
            this.drops[i] = 0;
        }
        
        this.drops[i]++;
    }
  };
  
  private animate = () => {
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}