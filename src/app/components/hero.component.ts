import { Component, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnDestroy, PLATFORM_ID, inject, output, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { TextContentService } from '../services/text-content.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private textContentService = inject(TextContentService);

  scrollTo = output<{ event: Event; href: string }>();

  t(key: string): string {
    return this.textContentService.get(key)();
  }
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private isAnimating = true;
  private resizeObserver!: ResizeObserver;
  private mouse = new THREE.Vector2();
  private resizeAnimationId: number | null = null;
  
  private mouseMoveListener!: () => void;
  
  isInitialized = signal(false);

  private outerCage!: THREE.Object3D;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScene();
      this.animate();
      this.mouseMoveListener = this.onMouseMove.bind(this);
      window.addEventListener('mousemove', this.mouseMoveListener);
      
      // Delay signal to allow for initial render and avoid flash
      setTimeout(() => this.isInitialized.set(true), 100);
    }
  }

  ngOnDestroy(): void {
    this.isAnimating = false;
    if (this.resizeAnimationId) {
        cancelAnimationFrame(this.resizeAnimationId);
    }
    this.resizeObserver?.disconnect();
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.traverse(object => {
          if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
              object.geometry.dispose();
              if (Array.isArray(object.material)) {
                  object.material.forEach(material => material.dispose());
              } else {
                  object.material.dispose();
              }
          }
      });
    }
    if(this.mouseMoveListener) {
      window.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }

  private onMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    const canvas = this.canvasRef.nativeElement;

    // Use a placeholder aspect ratio. ResizeObserver will correct it.
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.z = 2.5;

    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

    this.resizeObserver = new ResizeObserver(entries => {
      if (this.resizeAnimationId) {
        cancelAnimationFrame(this.resizeAnimationId);
      }
      this.resizeAnimationId = requestAnimationFrame(() => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
            this.onCanvasResize(width, height);
        }
      });
    });
    this.resizeObserver.observe(canvas);

    // Outer Cage
    const cageGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const cageMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    this.outerCage = new THREE.Mesh(cageGeometry, cageMaterial);
    this.scene.add(this.outerCage);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xA087A7, 10, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x8A6B93, 10, 100);
    pointLight2.position.set(-5, -5, -5);
    this.scene.add(pointLight2);
  }

  private onCanvasResize(width: number, height: number): void {
    if (!this.renderer || !this.camera) return;
    const dpr = window.devicePixelRatio || 1;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private animate = () => {
    if (!this.isAnimating) return;
    requestAnimationFrame(this.animate);

    this.outerCage.rotation.y += 0.001;

    // Mouse parallax effect
    this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }
}
