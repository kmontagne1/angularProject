import { Routes } from '@angular/router';
import { RacesComponent } from './races/races.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';

export const routes: Routes = [
  { path: 'races', component: RacesComponent },
  { path: 'races/:raceId', component: BetComponent },
  { path: 'races/:raceId/live', component: LiveComponent },
  { path: '', component: HomeComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];