import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HammerModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { routes } from './app.routes';

Hammer.defaults.cssProps.userSelect = '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(HammerModule),
    provideLuxonDateAdapter()
  ],
};
