import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  private token: string | null = this.getJwtToken(); // Récupérer le token depuis localStorage lors de l'initialisation

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const clone = req.clone({ setHeaders: { 'Authorization': `Bearer ${this.token}` } });
      return next.handle(clone);
    }
    return next.handle(req);
  }

  // Méthode pour stocker le token
  setJwtToken(token: string) {
    this.token = token;
    localStorage.setItem('jwtToken', token); // Stocker dans localStorage
  }

  // Méthode pour supprimer le token
  removeJwtToken() {
    this.token = null;
    localStorage.removeItem('jwtToken'); // Supprimer du localStorage
  }

  // Méthode pour récupérer le token depuis localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
