import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {routes} from './app/app.routes'
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { JwtInterceptorService } from './app/jwt-interceptor.service';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Fournir les routes au routeur Angular
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptorService,
      multi: true  // Permet d'ajouter plusieurs interceptors
    }
  ]
}).catch((err) => console.error(err));
