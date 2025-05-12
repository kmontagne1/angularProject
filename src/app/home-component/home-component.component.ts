import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs'; // Importer Subscription
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importer le Router pour la redirection
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'pr-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
  imports:[CommonModule, RouterLink]
})
export class HomeComponentComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false; // Propriété pour savoir si l'utilisateur est connecté
  private userSubscription: Subscription; // Pour gérer la souscription

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Souscrire à userEvents$ pour savoir quand l'utilisateur change
    this.userSubscription = this.userService.userEvents$.subscribe(user => {
      if (user) {
        this.isAuthenticated = true; // Utilisateur connecté
      } else {
        this.isAuthenticated = false; // Utilisateur déconnecté
        this.router.navigate(['/']); // Redirige vers la page d'accueil après déconnexion
      }
    });
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Méthode pour appeler la déconnexion
  logout(event: Event): void {
    event.preventDefault(); // Empêche la navigation par défaut
    this.userService.logout(); // Appelle la méthode logout du service
  }
}