import { Component, ChangeDetectionStrategy, output, ViewChild, ElementRef, inject, AfterViewInit, OnDestroy, signal } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';
import { VisitorDataService } from '../services/visitor-data.service';
import { Visitor } from '../models';

@Component({
  selector: 'app-visitor-globe',
  standalone: true,
  templateUrl: './visitor-globe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitorGlobeComponent implements AfterViewInit, OnDestroy {
  close = output<void>();

  @ViewChild('globeCanvas') private canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private visitorService = inject(VisitorDataService);
  private visitorSubscription: Subscription | null = null;
  
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private globe!: THREE.Points;
  private starField!: THREE.Points;
  private pointsGroup = new THREE.Group();
  private isAnimating = true;
  private resizeObserver!: ResizeObserver;
  private resizeAnimationId: number | null = null;

  latestVisitor = signal<Visitor | null>(null);

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
    this.visitorSubscription = this.visitorService.getVisitorStream().subscribe(visitor => {
      this.latestVisitor.set(visitor);
      this.addVisitorPoint(visitor.lat, visitor.lon);
    });
  }

  ngOnDestroy(): void {
    this.isAnimating = false;
    if (this.resizeAnimationId) {
        cancelAnimationFrame(this.resizeAnimationId);
    }
    this.visitorSubscription?.unsubscribe();
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
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1C1A27);

    const canvas = this.canvasRef.nativeElement;

    // Initialize with fallback dimensions; ResizeObserver will correct this immediately.
    const initialWidth = canvas.clientWidth || 1;
    const initialHeight = canvas.clientHeight || 1;
    this.camera = new THREE.PerspectiveCamera(45, initialWidth / initialHeight, 0.1, 1000);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Use ResizeObserver to dynamically set canvas size, fixing the initial render issue.
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

    // Dotted Globe
    const sphereGeom = new THREE.SphereGeometry(1, 40, 40);
    const globePointsGeometry = new THREE.BufferGeometry();
    globePointsGeometry.setAttribute('position', sphereGeom.getAttribute('position'));

    const globeMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.005,
      transparent: true,
      opacity: 0.6,
    });

    this.globe = new THREE.Points(globePointsGeometry, globeMaterial);
    this.scene.add(this.globe);
    this.globe.add(this.pointsGroup);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        const dist = x*x+y*y+z*z;
        if(dist < 10000) continue; // Avoid stars inside a certain radius
        starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 0.2 });
    this.starField = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.starField);
  }

  private onCanvasResize(width: number, height: number): void {
    if (!this.renderer || !this.camera) return;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private addVisitorPoint(lat: number, lon: number): void {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const radius = 1.01;
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    const pointGeometry = new THREE.SphereGeometry(0.01, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffc300 }); // Vibrant yellow
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    point.position.set(x, y, z);
    this.pointsGroup.add(point);

    // Remove old points to avoid clutter, ensuring proper resource disposal
    if (this.pointsGroup.children.length > 20) {
        const oldPoint = this.pointsGroup.children.shift();
        if(oldPoint instanceof THREE.Mesh) {
            oldPoint.geometry.dispose();
            if (Array.isArray(oldPoint.material)) {
                oldPoint.material.forEach(material => material.dispose());
            } else {
                oldPoint.material.dispose();
            }
        }
    }
  }

  private animate = () => {
    if (!this.isAnimating) return;
    requestAnimationFrame(this.animate);
    
    this.globe.rotation.y += 0.0005;
    this.starField.rotation.y += 0.0001;

    // Pulse the latest point for a subtle visual cue
    if (this.pointsGroup.children.length > 0) {
        const latestPoint = this.pointsGroup.children[this.pointsGroup.children.length - 1];
        const scale = 1 + Math.sin(Date.now() * 0.008) * 0.2;
        latestPoint.scale.set(scale, scale, scale);
    }

    this.renderer.render(this.scene, this.camera);
  }
}