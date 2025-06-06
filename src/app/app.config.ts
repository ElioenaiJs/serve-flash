import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
// import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    // provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, 
    provideDatabase(() => getDatabase()), 
    provideMessaging(() => getMessaging())
  ]
};
