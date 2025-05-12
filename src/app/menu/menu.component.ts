import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';  // Importer Subscription

@Component({
  selector: 'pr-menu',
  imports: [RouterLink,CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;  // Le menu est fermé par défaut
  currentUser: UserModel | null = null;  // Propriété pour stocker l'utilisateur
  isAuthenticated = false;  // Indicateur pour savoir si l'utilisateur est authentifié
  private userSubscription: Subscription;  // Déclarer une propriété pour la subscription

  constructor(
    private userService: UserService,
    private router: Router  // Injecter le service Router
  ) {}

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;  // Inverse la valeur
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.userEvents$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isAuthenticated = true;
      } else {
        this.currentUser = null;
        this.isAuthenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/home']);
  }
}
