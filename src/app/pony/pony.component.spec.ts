import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PonyComponent } from './pony.component';
import { PonyModel } from '../models/pony.model'; // Assurez-vous que le modèle est importé
import { RaceService } from '../race.service'; // Importez le service

describe('PonyComponent', () => {
  let component: PonyComponent;
  let fixture: ComponentFixture<PonyComponent>;

  // Créez un mock pour le modèle de poney
  const mockPony: PonyModel = {
    id: 1,
    name: 'Gentle Pie',
    color: 'yellow' // Définissez une couleur pour tester
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PonyComponent], // Assurez-vous que PonyComponent est importé
      providers: [RaceService], // Si le service est utilisé dans ce test
    }).compileComponents();

    fixture = TestBed.createComponent(PonyComponent);
    component = fixture.componentInstance;

    // Fournir le modèle de poney mocké à l'input 'ponyModel'
    component.ponyModel = mockPony;

    fixture.detectChanges(); // Déclenche un changement pour appliquer le modèle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the pony image URL correctly', fakeAsync(() => {
    // Attendre que les données soient "chargées" avec le délai
    const expectedUrl = 'assets/images/pony-yellow.gif';
    
    // Simuler le délai du service (500 ms comme dans votre service)
    tick(500); // Cela simule le passage de 500ms

    fixture.detectChanges(); // Rafraîchir la vue après le délai

    expect(component.getPonyImageUrl()).toBe(expectedUrl);
  }));
});
