import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, takeWhile} from 'rxjs';
import { LiveRaceModel, RaceModel } from './models/race.model'; 
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';


@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private apiUrl = 'https://ponyracer.ninja-squad.com/api/races';
  private selectedBetPonyId: number | null = null;

  constructor(private http: HttpClient, private wsService:WsService) {}

  list(): Observable<RaceModel[]> {
    const params = new HttpParams().set('status', 'PENDING');
    return this.http.get<RaceModel[]>(this.apiUrl, { params });
  }

  get(id: number): Observable<RaceModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RaceModel>(url);
  }

  bet(raceId: number, ponyId: number): Observable<any> {
    const betApiUrl = `${this.apiUrl}/${raceId}/bets`;
    const body = { ponyId };
  
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Récupération du token stocké
      'Content-Type': 'application/json', // Optionnel si déjà par défaut
    };

    return this.http.post(betApiUrl, body, { headers });
  }

  cancelBet(raceId:number){
    
    const betApiUrl = `${this.apiUrl}/${raceId}/bets`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Récupération du token stocké
      'Content-Type': 'application/json', // Optionnel si déjà par défaut
    };
    return this.http.delete<void>(betApiUrl,{ headers });
  }

  
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED', true),
      map(liveRace => liveRace.ponies)
    );
  }

    // Setter pour définir l'ID du poney sélectionné
    setBetPonyId(ponyId: number | null): void {
      this.selectedBetPonyId = ponyId;
    }
  
    // Getter pour récupérer l'ID du poney sélectionné
    getBetPonyId(): number | null {
      return this.selectedBetPonyId;
    }
  
}

