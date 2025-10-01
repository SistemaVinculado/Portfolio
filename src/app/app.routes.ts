import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent), 
    title: 'StellarDev Agency | Home' 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./pages/about-page.component').then(m => m.AboutPageComponent), 
    title: 'StellarDev Agency | About Us' 
  },
  { 
    path: 'services', 
    loadComponent: () => import('./pages/services-page.component').then(m => m.ServicesPageComponent), 
    title: 'StellarDev Agency | Services' 
  },
  { 
    path: 'work', 
    loadComponent: () => import('./pages/work-page.component').then(m => m.WorkPageComponent), 
    title: 'StellarDev Agency | Our Work' 
  },
  { 
    path: 'insights', 
    loadComponent: () => import('./pages/insights-page.component').then(m => m.InsightsPageComponent), 
    title: 'StellarDev Agency | Insights & Labs' 
  },
  { 
    path: 'careers', 
    loadComponent: () => import('./pages/careers-page.component').then(m => m.CareersPageComponent), 
    title: 'StellarDev Agency | Careers' 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact-page.component').then(m => m.ContactPageComponent), 
    title: 'StellarDev Agency | Contact Us' 
  },
  { 
    path: 'status', 
    loadComponent: () => import('./pages/status-page.component').then(m => m.StatusPageComponent), 
    title: 'StellarDev Agency | System Status' 
  },
  { 
    path: 'security', 
    loadComponent: () => import('./pages/security-page.component').then(m => m.SecurityPageComponent), 
    title: 'StellarDev Agency | Mission Control' 
  },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];