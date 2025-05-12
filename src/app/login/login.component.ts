import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pr-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed = false;

  constructor(private userService: UserService, private router: Router) {}

  authenticate() {
    this.userService.authenticate(this.credentials).subscribe({
      next: (user) => {
        if (user) {
          // Rediriger vers le composant Home en cas de succès
          this.router.navigate(['/']);
        }
      },
      error: () => {
        // En cas d'échec, afficher le message d'erreur
        this.authenticationFailed = true;
      }
    });
  }
}
