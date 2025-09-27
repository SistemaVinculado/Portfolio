import { Component, ChangeDetectionStrategy, input, output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Technology } from '../models';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  data: Technology;
  connections: Node[];
}

@Component({
  selector: 'app-technology-constellation',
  standalone: true,
  template: `<canvas #constellationCanvas class="w-full h-full cursor-pointer" appAnimateOnScroll></canvas>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyConstellationComponent implements AfterViewInit, OnDestroy {
  technologies = input.required<Technology[]>();
  highlightedTechnology = input<string | null>(null);
  nodeClick = output<Technology>();

  @ViewChild('constellationCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private animationFrameId: number | null = null;
  private resizeObserver!: ResizeObserver;
  private resizeAnimationId: number | null = null;
  private mouse = { x: -1000, y: -1000 };
  private hoveredNode: Node | null = null;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D rendering context.');
      return;
    }
    this.ctx = context;

    this.setupResizeObserver();
    this.initializeNodes();
    this.addEventListeners();
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
    this.removeEventListeners();
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      if (this.resizeAnimationId) {
        cancelAnimationFrame(this.resizeAnimationId);
      }
      this.resizeAnimationId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry || entry.contentRect.width === 0 || entry.contentRect.height === 0) return;
        const { width, height } = entry.contentRect;
        this.resizeCanvas(width, height);
        this.initializeNodes(); // Re-initialize nodes for new dimensions
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

  private initializeNodes(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    
    this.nodes = this.technologies().map(tech => ({
      x: width / 2 + (Math.random() - 0.5) * width * 0.5,
      y: height / 2 + (Math.random() - 0.5) * height * 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 8,
      data: tech,
      connections: [],
    }));

    const nameMap = new Map(this.nodes.map(node => [node.data.name, node]));
    this.nodes.forEach(node => {
      if (node.data.related) {
        node.data.related.forEach(relatedName => {
          const relatedNode = nameMap.get(relatedName);
          if (relatedNode) {
            // Avoid duplicate connections
            if (!node.connections.includes(relatedNode)) {
              node.connections.push(relatedNode);
            }
            if (!relatedNode.connections.includes(node)) {
              relatedNode.connections.push(node);
            }
          }
        });
      }
    });
  }

  private addEventListeners(): void {
    this.canvasRef.nativeElement.addEventListener('mousemove', this.onMouseMove);
    this.canvasRef.nativeElement.addEventListener('mouseleave', this.onMouseLeave);
    this.canvasRef.nativeElement.addEventListener('click', this.onClick);
  }

  private removeEventListeners(): void {
    if (this.canvasRef?.nativeElement) {
      this.canvasRef.nativeElement.removeEventListener('mousemove', this.onMouseMove);
      this.canvasRef.nativeElement.removeEventListener('mouseleave', this.onMouseLeave);
      this.canvasRef.nativeElement.removeEventListener('click', this.onClick);
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  };
  
  private onMouseLeave = () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.hoveredNode = null;
  };

  private onClick = (event: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    let clickedNode: Node | null = null;
    // Find the topmost node if there are overlaps
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const node = this.nodes[i];
      const distance = Math.sqrt(Math.pow(clickX - node.x, 2) + Math.pow(clickY - node.y, 2));
      if (distance < node.radius * 2) { // Generous hit area for clicks
        clickedNode = node;
        break;
      }
    }
    
    if (clickedNode) {
        this.nodeClick.emit(clickedNode.data);
    }
  };
  
  private update(): void {
    const width = this.canvasRef.nativeElement.offsetWidth;
    const height = this.canvasRef.nativeElement.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let closestNode: Node | null = null;
    let minDistance = 50; // Detection radius

    this.nodes.forEach(node => {
      this.nodes.forEach(otherNode => {
        if (node === otherNode) return;
        const dx = otherNode.x - node.x;
        const dy = otherNode.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100 * -0.05;
          node.vx += (dx / distance) * force;
          node.vy += (dy / distance) * force;
        }
      });

      const dxCenter = centerX - node.x;
      const dyCenter = centerY - node.y;
      node.vx += dxCenter * 0.0001;
      node.vy += dyCenter * 0.0001;
      node.vx *= 0.98;
      node.vy *= 0.98;
      node.x += node.vx;
      node.y += node.vy;

      if (node.x - node.radius < 0) { node.x = node.radius; node.vx *= -0.5; }
      if (node.x + node.radius > width) { node.x = width - node.radius; node.vx *= -0.5; }
      if (node.y - node.radius < 0) { node.y = node.radius; node.vy *= -0.5; }
      if (node.y + node.radius > height) { node.y = height - node.radius; node.vy *= -0.5; }
      
      const distMouse = Math.sqrt(Math.pow(this.mouse.x - node.x, 2) + Math.pow(this.mouse.y - node.y, 2));
      if(distMouse < minDistance) {
          minDistance = distMouse;
          closestNode = node;
      }
    });

    this.hoveredNode = closestNode;
  }
  
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.offsetWidth, this.canvasRef.nativeElement.offsetHeight);
    const isDark = document.documentElement.classList.contains('dark');
    
    const nodeToHighlight = this.nodes.find(n => n.data.name === this.highlightedTechnology());
    const activeNode = this.hoveredNode || nodeToHighlight;

    // Draw connections
    this.nodes.forEach(node => {
      // Draw each connection only once to avoid over-drawing
      for (const conn of node.connections) {
        if (this.nodes.indexOf(conn) < this.nodes.indexOf(node)) continue;

        const isActiveConnection = activeNode && (activeNode === node || activeNode === conn);

        this.ctx.beginPath();
        this.ctx.moveTo(node.x, node.y);
        this.ctx.lineTo(conn.x, conn.y);
        this.ctx.strokeStyle = isActiveConnection ? (isDark ? 'rgba(192, 132, 252, 0.6)' : 'rgba(138, 107, 147, 0.8)') : (isDark ? 'rgba(107, 114, 128, 0.3)' : 'rgba(209, 213, 219, 0.8)');
        this.ctx.lineWidth = isActiveConnection ? 1.5 : 1;
        this.ctx.stroke();
      }
    });
    
    // Draw nodes
    this.nodes.forEach(node => {
      const isActive = activeNode === node;
      const isConnectedToActive = activeNode?.connections.includes(node);

      const radius = isActive ? node.radius * 1.5 : node.radius;
      
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isDark ? 
        (isActive ? '#C084FC' : isConnectedToActive ? '#A78BFA' : '#E5E7EB') : 
        (isActive ? '#8A6B93' : isConnectedToActive ? '#A087A7' : '#292639');
      this.ctx.fill();

      if (isActive) {
          this.ctx.beginPath();
          this.ctx.arc(node.x, node.y, radius + 4, 0, Math.PI * 2);
          this.ctx.fillStyle = isDark ? 'rgba(192, 132, 252, 0.2)' : 'rgba(138, 107, 147, 0.2)';
          this.ctx.fill();
      }
    });

    // Draw label
    if (activeNode) {
      this.ctx.font = 'bold 14px Manrope, sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillStyle = isDark ? '#FFFFFF' : '#000000';
      this.ctx.fillText(activeNode.data.name, activeNode.x, activeNode.y - activeNode.radius - 8);
    }
  }

  private animate = () => {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}