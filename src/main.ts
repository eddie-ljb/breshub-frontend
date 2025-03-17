import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding, withRouterConfig  } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import 'primeicons/primeicons';




bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })), provideAnimations(), provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false || 'none'
            }
        },
    }),]
}).catch(err => console.error(err));
