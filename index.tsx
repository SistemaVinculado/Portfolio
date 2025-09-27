

import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions, withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './src/app/app.component';
import { routes } from './src/app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes, 
      withHashLocation(), 
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),
  ],
}).catch(err => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.