import { Injectable} from '@angular/core';
import * as Webstomp from 'webstomp-client';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class WsService {

  
  constructor() { }
  
  connect<T>(channel: string): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const connection: WebSocket = new WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Webstomp.Client = Webstomp.over(connection);
      let subscription: Webstomp.Subscription;
  
      stompClient.connect({ login: null, passcode: null }, () => {
        subscription = stompClient.subscribe(channel, (message) => {
          const bodyAsJson = JSON.parse(message.body);
          observer.next(bodyAsJson);
        });
      }, (error) => {
        observer.error(error);
      });
  
      // Gestion de la désinscription et de la fermeture de la connexion lors de la destruction de l'observable
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}

