import { Component, ChangeDetectionStrategy, signal, computed, effect, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ScrollObserverDirective } from '../../directives/scroll-observer.directive';

interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    AnimateOnScrollDirective,
    ShimmerTextDirective,
    ScrollObserverDirective,
  ],
  templateUrl: './about-section.component.html',
  styles: [`
    :host {
      display: block;
    }
    .carousel-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .card-3d {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transition: opacity 0.5s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  private readonly scrollObserver = viewChild.required(ScrollObserverDirective);

  readonly scrollProgress = computed(() => this.scrollObserver().scrollProgress());
  readonly activeFeatureIndex = signal(0);
  readonly carouselRotation = computed(() => this.scrollProgress() * -120);

  features: Feature[] = [
    {
      id: 'strategy',
      number: '01',
      title: 'Pensamento Fundamental',
      description:
        'O processo inicia-se com uma imersão nos princípios do seu negócio. Atuo como um parceiro de pensamento para definir um roteiro que alinha a inovação digital aos seus objetivos mais fundamentais.',
    },
    {
      id: 'design',
      number: '02',
      title: 'Design de Princípios',
      description:
        'Um design de prestígio é a fusão de estética e propósito. Arquitetamos jornadas de usuário que são, por princípio, intuitivas e memoráveis, fortalecendo a lealdade e impulsionando a conversão.',
    },
    {
      id: 'tech',
      number: '03',
      title: 'Engenharia de Precisão',
      description:
        'Minha engenharia é sinônimo de excelência fundamental. Emprego tecnologias de ponta para construir produtos digitais robustos, seguros e perpetuamente escaláveis.',
    },
  ];

  constructor() {
    effect(() => {
      const progress = this.scrollProgress();
      const newIndex = Math.min(this.features.length - 1, Math.floor(progress * this.features.length));
      this.activeFeatureIndex.set(newIndex);
    });
  }
}
