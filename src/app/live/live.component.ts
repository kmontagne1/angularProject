import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';

@Component({
  selector: 'pr-live',
  imports: [CommonModule, PonyComponent,FromNowPipe],
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceRunning: RaceModel | null = null; // La course en cours
  poniesWithPosition: Array<PonyWithPositionModel> = []; // Les positions des poneys
  positionSubscription: Subscription | null = null; // Souscription aux positions
  winners: Array<PonyWithPositionModel>;
  error: boolean;
  betWon: boolean;

  constructor(
    private raceService: RaceService, // Injection de RaceService
    private route: ActivatedRoute // Injection d'ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupération de raceId à partir de l'URL
    const raceId = Number(this.route.snapshot.paramMap.get('raceId'));

    if (raceId) {
      // Appel pour obtenir les détails de la course
      this.raceService.get(raceId).pipe(
        tap(race => {
          this.raceRunning = race;
          this.raceRunning.betPonyId = this.raceService.getBetPonyId();
            console.log(
              `Pending race. Bet placed on pony with ID: ${race.betPonyId}`
            );
          // Stocke les détails de la course dans raceModel
        }),
        filter(race => race.status !== 'FINISHED'), // On ne continue que si la course n'est pas terminée
        switchMap(race => this.raceService.live(raceId)) // Transforme l'événement de la course en positions des poneys
      ).subscribe({
        next: (positions) => {
          this.poniesWithPosition = positions; // Mise à jour des positions des poneys
          this.raceRunning.status = 'RUNNING'; // Marque la course comme étant en cours
        },
        error: () => {
          this.error = true; // En cas d'erreur, active l'état d'erreur
        },
        complete: () => {
          // Course terminée
          this.raceRunning.status = 'FINISHED'; // Marque la course comme terminée
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100); // Filtre les poneys gagnants
          // Vérifie si le pari a été remporté
          this.betWon = this.winners.some(pony => pony.id === this.raceRunning.betPonyId);
        }
      });
    } else {
      console.error('No race ID found in URL.');
    }
  }

  ngOnDestroy(): void {
    // Désinscription de l'observable pour éviter les fuites de mémoire
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
