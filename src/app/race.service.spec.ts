/*import { TestBed } from '@angular/core/testing';

import { RaceService } from './race.service';

describe('RaceService', () => {
  let service: RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


import { TestBed } from '@angular/core/testing';
import { RaceService } from './race.service';  // Importation du service réel

describe('RaceService (Standalone) exo 4', () => {
  let service: RaceService;

  beforeEach(() => {
    // Configurer le module de test
    TestBed.configureTestingModule({
      imports: [],  
      providers: [RaceService]             // Fournir le service réel
    });

    service = TestBed.inject(RaceService);  // Utilisation de `inject` pour récupérer le service réel
  });

  it('should list races', () => {
    // Les données sont ici statiques (en local) et ne nécessitent pas de requêtes HTTP
    const races = service.list(); // Utilisation de la méthode `list()` du service pour obtenir les courses

    // Vérification que la méthode retourne bien cinq courses
    expect(races.length)
      .withContext('The service should return five races for the `list()` method')
      .toBe(5);
  });
});

import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { RaceService } from './race.service';
import { RaceModel } from './models/race.model';

describe('RaceService (Standalone)exo 5', () => {
  let service: RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // Pas de dépendances additionnelles nécessaires
      providers: [RaceService], // Fournir le service réel dans le contexte du module autonome
    });

    service = TestBed.inject(RaceService); // Récupérer l'instance du service
  });

  it('should list races', fakeAsync(() => {
    let fetchedRaces: RaceModel[] = [];
    const observable = service.list();

    observable.subscribe((races: RaceModel[]) => (fetchedRaces = races));

    tick(200);

    expect(fetchedRaces.length)
      .withContext('The service should return the races after a 500ms delay')
      .toBe(0);

    tick(400);

    expect(fetchedRaces.length)
      .withContext(
        'The service should return five races in an Observable for the `list()` method after 500ms'
      )
      .toBe(5);
  }));
});
*/
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { RaceService } from './race.service';
import { RaceModel } from './models/race.model';

describe('RaceService (Standalone) exo 6', () => {
  let service: RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // Pas de dépendances supplémentaires nécessaires
      providers: [RaceService], // Fournir le service réel
    }).compileComponents(); // Compiler les composants nécessaires

    service = TestBed.inject(RaceService); // Injection du service réel
  });

  it('should list races', fakeAsync(() => {
    let fetchedRaces: RaceModel[] = []; // Assurez-vous que cela est RaceModel[]
    const observable = service.list();
    observable.subscribe((races: RaceModel[]) => fetchedRaces = races);

    tick(200); // Simuler un délai de 200ms

    expect(fetchedRaces.length)
      .withContext('The service should return the races after a 500ms delay')
      .toBe(0);

    tick(400); // Compléter le délai de 500ms total

    expect(fetchedRaces.length)
      .withContext('The service should return two races in an Observable for the `list()` method after 500ms')
      .toBe(2);

    // Assurez-vous que le tableau fetchedRaces contient des objets RaceModel complets
    const paris = fetchedRaces[0];
    expect(paris.name).toBe('Paris');
    expect(paris.ponies.length)
      .withContext('The races should include the ponies')
      .toBe(5);
  }));
});