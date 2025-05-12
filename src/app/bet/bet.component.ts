import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model'; // Assurez-vous d'importer le modèle
import { FromNowPipe } from '../from-now.pipe';
import { PonyComponent } from '../pony/pony.component';
import { PonyModel } from '../models/pony.model';



@Component({
  selector: 'pr-bet',
  imports: [CommonModule,FromNowPipe,RouterLink, PonyComponent],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.css',
})
export class BetComponent implements OnInit {
  raceModel: RaceModel | null = null;
  betFailed =false;
  

  constructor(
    private route: ActivatedRoute,
    private raceService: RaceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const raceId = params.get('raceId');
      if (raceId) {
        this.raceService.get(+raceId).subscribe({
          next: (race) => {
            this.raceModel = race;
          },
          error: (err) => {
            console.error('Erreur lors du chargement de la course', err);
          },
        });
      }
    });
  }
  betOnPony(pony: PonyModel) {
    if (this.isPonySelected(pony)) {
      console.log('On annule le pari');
      this.raceService.cancelBet(this.raceModel.id).subscribe({
        next: () => {
          this.raceModel.betPonyId = null;
          // Met à jour l'état dans le service RaceService
          this.raceService.setBetPonyId(null); 
          this.betFailed = false;
        },
        error: () => {
          this.betFailed = true;
        },
      });
    } else {
      console.log('On place un pari');
      this.raceService.bet(this.raceModel.id, pony.id).subscribe({
        next: () => {
          this.raceModel.betPonyId = pony.id;
          // Met à jour l'état dans le service RaceService
          this.raceService.setBetPonyId(pony.id); 
          this.betFailed = false;
        },
        error: () => {
          this.betFailed = true;
        },
      });
    }
  } 
  
  
  isPonySelected(pony: PonyModel) {
    return pony.id === this.raceModel.betPonyId;
  }



}

