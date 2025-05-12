/*import { TestBed } from '@angular/core/testing';
import { RacesComponent } from './races.component';

describe('RacesComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RacesComponent], // Importer le composant standalone ici
    })
  );

  it('should display every race name in a title', () => {
    const fixture = TestBed.createComponent(RacesComponent);
    fixture.detectChanges();

    // Vérifications sur le champ `races`
    expect(fixture.componentInstance.races)
      .withContext('You need to have a field `races` initialized with 2 races')
      .not.toBeNull();
    expect(fixture.componentInstance.races.length)
      .withContext('You need to have a field `races` initialized with 2 races')
      .toBe(2);
    expect(fixture.componentInstance.races[0].name).toBe('Lyon');
    expect(fixture.componentInstance.races[1].name).toBe('London');

    // Vérifications sur le DOM rendu
    const element = fixture.nativeElement;
    const raceNames = element.querySelectorAll('li'); // Remplacez `h2` par `li` pour correspondre à votre template
    expect(raceNames.length)
      .withContext('You should have an `li` element per race in your template')
      .toBe(2);
    expect(raceNames[0].textContent).toContain('Lyon');
    expect(raceNames[1].textContent).toContain('London');
  });
});


import { TestBed } from '@angular/core/testing';
import { RacesComponent } from './races.component';
import { RaceService } from '../race.service';

describe('RacesComponent (Standalone) exo 4', () => {
  let service: RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RacesComponent], // Importation du composant autonome
      providers: [RaceService],  // Fourniture du service réel sans HTTP
    });

    service = TestBed.inject(RaceService); // Injection du service réel dans le test
  });

  it('should display every race name in a title', () => {
    // Simuler une liste de courses sans faire de requête HTTP
    spyOn(service, 'list').and.returnValue([
      { name: 'Lyon' },
      { name: 'Los Angeles' },
      { name: 'Sydney' },
      { name: 'Tokyo' },
      //{ name: 'Casablanca' }
    ]);  // Retourner directement les données statiques pour la liste des courses

    const fixture = TestBed.createComponent(RacesComponent);
    fixture.detectChanges();  // Détection des changements dans le composant

    // Vérification que la méthode `list` du service a bien été appelée
    expect(service.list).toHaveBeenCalled();

    // Vérification de l'état de `races` dans le composant
    expect(fixture.componentInstance.races)
      .withContext('You need to have a field `races` initialized with 5 races')
      .not.toBeNull();
    expect(fixture.componentInstance.races.length)
      .withContext('You need to have a field `races` initialized with 5 races')
      .toBe(4);
    expect(fixture.componentInstance.races[0].name).toBe('Lyon');
    expect(fixture.componentInstance.races[1].name).toBe('Los Angeles');
    expect(fixture.componentInstance.races[2].name).toBe('Sydney');
    expect(fixture.componentInstance.races[3].name).toBe('Tokyo');
    //expect(fixture.componentInstance.races[4].name).toBe('Casablanca');

    // Vérification du DOM pour les titres `h2` associés aux courses
    const element = fixture.nativeElement;
    const raceNames = element.querySelectorAll('h2');
    expect(raceNames.length)
      .withContext('You should have five `h2` elements')
      .toBe(4);  // Il y a cinq courses, donc cinq titres `h2` doivent être présents
    expect(raceNames[0].textContent).toContain('Lyon');
    expect(raceNames[1].textContent).toContain('Los Angeles');
    expect(raceNames[2].textContent).toContain('Sydney');
    expect(raceNames[3].textContent).toContain('Tokyo');
    //expect(raceNames[4].textContent).toContain('Casablanca');
  });
});


import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RacesComponent } from './races.component';
import { RaceService } from '../race.service';

describe('RacesComponent (Standalone) exo 5', () => {
  let service: RaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [], // Pas de dépendances supplémentaires nécessaires
      providers: [RaceService], // Fournir le service réel
    }).compileComponents();

    service = TestBed.inject(RaceService); // Injection du service réel
  });

  it('should display every race name in a title', () => {
    spyOn(service, 'list').and.returnValue(
      of([
        { name: 'Lyon' },
        { name: 'Los Angeles' },
        { name: 'Sydney' },
        { name: 'Tokyo' },
        { name: 'Casablanca' },
      ])
    );

    const fixture = TestBed.createComponent(RacesComponent);
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalled();

    expect(fixture.componentInstance.races)
      .withContext('You need to have a field `races` initialized with 5 races')
      .not.toBeNull();
    expect(fixture.componentInstance.races.length)
      .withContext('You need to have a field `races` initialized with 5 races')
      .toBe(5);
    expect(fixture.componentInstance.races[0].name).toBe('Lyon');
    expect(fixture.componentInstance.races[1].name).toBe('Los Angeles');
    expect(fixture.componentInstance.races[2].name).toBe('Sydney');
    expect(fixture.componentInstance.races[3].name).toBe('Tokyo');
    expect(fixture.componentInstance.races[4].name).toBe('Casablanca');

    const element = fixture.nativeElement;
    const raceNames = element.querySelectorAll('h2');
    expect(raceNames.length)
      .withContext('You should have four `h2` elements')
      .toBe(4);
    expect(raceNames[0].textContent).toContain('Lyon');
    expect(raceNames[1].textContent).toContain('Los Angeles');
    expect(raceNames[2].textContent).toContain('Sydney');
    expect(raceNames[3].textContent).toContain('Tokyo');
  });
});
*/