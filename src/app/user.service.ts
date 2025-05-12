import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { environment } from 'src/environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.baseUrl}/api/users`;
  private apiLogin = `${this.apiUrl}/authentication`;

  private userConnecte = new BehaviorSubject<UserModel | null>(null);
  userEvents$ = this.userConnecte.asObservable();

  isAuthenticated = false; // Indique si l'utilisateur est authentifié

  constructor(private http: HttpClient, private jwtService:JwtInterceptorService) {
    // Vérifie si un utilisateur est stocké dans le localStorage au démarrage de l'application
    this.retrieveUser();
  }

  // Méthode pour enregistrer un utilisateur
  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const payload = { login, password, birthYear };
    return this.http.post<UserModel>(this.apiUrl, payload);
  }

  // Méthode pour authentifier un utilisateur
  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiLogin, credentials).pipe(
      tap(user => {
        this.storeLoggedInUser(user); // Appel de la méthode pour stocker l'utilisateur
      }),
      catchError(error => {
        console.error('Authentication failed:', error);
        this.isAuthenticated = false; // Authentification échouée
        return of(null);
      })
    );
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.userConnecte.next(null); // Émet null pour signifier qu'aucun utilisateur n'est connecté
    this.isAuthenticated = false; // L'utilisateur n'est plus authentifié
    this.jwtService.removeJwtToken();
    localStorage.removeItem('rememberMe'); // Supprime l'utilisateur du localStorage
  }

  // Méthode pour stocker l'utilisateur dans le localStorage
  private storeLoggedInUser(user: UserModel): void {
    // Sérialise l'utilisateur et stocke dans le localStorage avec la clé "rememberMe"
    localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userConnecte.next(user); // Émet l'utilisateur connecté
    this.isAuthenticated = true; // L'utilisateur est authentifié
    this.jwtService.setJwtToken(user.token);
  }

  // Méthode pour récupérer l'utilisateur depuis le localStorage
  private retrieveUser(): void {
    const storedUser = localStorage.getItem('rememberMe');
    if (storedUser) {
      const user: UserModel = JSON.parse(storedUser);
      this.userConnecte.next(user); // Émet l'utilisateur
      this.isAuthenticated = true; // L'utilisateur est authentifié
      this.jwtService.setJwtToken(user.token);
    }
  }

}