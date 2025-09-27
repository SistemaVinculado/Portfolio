import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BlogPost } from '../models';

@Component({
  selector: 'app-blog-modal',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './blog-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogModalComponent {
  post = input.required<BlogPost>();
  close = output<void>();
}
