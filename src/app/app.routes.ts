import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { StatusPageComponent } from './pages/status-page.component';
import { AboutPageComponent } from './pages/about-page.component';
import { ServicesPageComponent } from './pages/services-page.component';
import { WorkPageComponent } from './pages/work-page.component';
import { InsightsPageComponent } from './pages/insights-page.component';
import { CareersPageComponent } from './pages/careers-page.component';
import { ContactPageComponent } from './pages/contact-page.component';
import { SecurityPageComponent } from './pages/security-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'StellarDev Agency | Home' },
  { path: 'about', component: AboutPageComponent, title: 'StellarDev Agency | About Us' },
  { path: 'services', component: ServicesPageComponent, title: 'StellarDev Agency | Services' },
  { path: 'work', component: WorkPageComponent, title: 'StellarDev Agency | Our Work' },
  { path: 'insights', component: InsightsPageComponent, title: 'StellarDev Agency | Insights & Labs' },
  { path: 'careers', component: CareersPageComponent, title: 'StellarDev Agency | Careers' },
  { path: 'contact', component: ContactPageComponent, title: 'StellarDev Agency | Contact Us' },
  { path: 'status', component: StatusPageComponent, title: 'StellarDev Agency | System Status' },
  { path: 'security', component: SecurityPageComponent, title: 'StellarDev Agency | Mission Control' },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];