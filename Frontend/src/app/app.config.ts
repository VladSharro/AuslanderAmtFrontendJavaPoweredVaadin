import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth } from '@angular/fire/auth'
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { app, auth } from '../environments/environment'
import { FirebaseAppModule } from '@angular/fire/app';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(),
  
  importProvidersFrom(
                      provideFirebaseApp( () => app), 
                      provideFirestore( () => getFirestore()),
                      provideAuth( () => auth),
                      
                    ), 
  ]
};
