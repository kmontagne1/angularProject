import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service'; // Import du service
import { CommonModule } from '@angular/common'; 
import { RaceModel } from '../models/race.model';
import { RaceComponent } from '../race/race.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'; // Ajouter dans les imports si nécessaire



@Component({
  selector: 'pr-races',
  imports: [CommonModule,RaceComponent, RouterLink,RouterModule],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  races: RaceModel[] = [];

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    this.raceService.list().subscribe((data: RaceModel[]) => {
      this.races = data;
    });
  }

  onBetClick(raceId: string) {
    console.log('Navigating to bet for race ID:', raceId);
  } 
  

}
