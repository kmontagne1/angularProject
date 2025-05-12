import { Component, Input, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model'; // Importer le modèle RaceModel
import { PonyComponent } from '../pony/pony.component';  // Importer PonyComponent
import { CommonModule } from '@angular/common';
import { FromNowPipe } from '../from-now.pipe';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css'],
  imports: [CommonModule, PonyComponent, FromNowPipe]  // Ajouter PonyComponent pour l'affichage des poneys
})
export class RaceComponent implements OnInit {
  @Input() raceModel: RaceModel;  // Recevoir l'objet RaceModel via l'input

   
  constructor() {
  }

   
  ngOnInit() {
  }

}