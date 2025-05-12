import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;
  registrationFailed = false;

  constructor(fb: FormBuilder,private userService: UserService,private router: Router) {
    // Initialisation des contrôles
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', Validators.required);
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.confirmPasswordCtrl = fb.control('');

    // Création du formulaire passwordForm avec les contrôles nécessaires
    this.passwordForm = fb.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: RegisterComponent.passwordMatch
    });

    // Création du formulaire userForm avec passwordForm inclus
    this.userForm = fb.group({
      login: this.loginCtrl,
      birthYear: this.birthYearCtrl,
      passwordForm: this.passwordForm,
    });
  }

  register() {
    if (this.userForm.invalid) {
      return;
    }

    const { login, birthYear } = this.userForm.value;
    const password = this.passwordCtrl.value;

    this.userService.register(login, password, birthYear).subscribe({
      next: () => this.router.navigate(['/welcome']),
      error: () => this.registrationFailed = true
    });
  }

  // Validation pour vérifier que les mots de passe correspondent
  static passwordMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { matchingError: true };
  }
}
