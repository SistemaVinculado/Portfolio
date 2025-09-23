import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import { GlobalReachComponent } from '../../components/global-reach/global-reach.component';
import { ShimmerTextDirective } from '../../directives/shimmer-text.directive';
import { ImagePlaceholderComponent } from '../../components/image-placeholder/image-placeholder.component';
import { teamMembersData } from '../../data/team.data';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AnimateOnScrollDirective,
    CtaSectionComponent,
    GlobalReachComponent,
    ShimmerTextDirective,
    ImagePlaceholderComponent,
    TiltOnHoverDirective,
  ],
  templateUrl: './about.component.html',
  styles: [`
    /* Footer Social Icon Styles (also used here for team members) */
    .footer-social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      background-color: #242424; /* charcoal-light */
      color: #9ca3af; /* gray-400 */
      transition: all 0.3s ease-out;
    }
    .footer-social-icon:hover {
      background-color: #fff;
      color: #111;
      transform: scale(1.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  teamMembers = teamMembersData;
}