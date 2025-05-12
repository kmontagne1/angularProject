import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common'; // Assurez-vous que CommonModule est importé
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'pr-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ponyracer';
}
