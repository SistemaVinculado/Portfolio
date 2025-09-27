import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { StatusPageComponent } from './pages/status-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'StellarDev Agency | Home' },
  { path: 'status', component: StatusPageComponent, title: 'StellarDev Agency | System Status' },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect unknown routes to home
];
