import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/fr'; // Importer la locale française

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    moment.locale('fr'); // Configurer la locale

    const now = moment();
    const target = moment(value);
    const diffInSeconds = target.diff(now, 'seconds'); // Calculer la différence en secondes

    if (diffInSeconds <= 60) {
      // Pour une différence de 60 secondes ou moins, afficher "dans X secondes"
      return `Début dans ${diffInSeconds} seconde${diffInSeconds > 1 ? 's' : ''}`;
    }

    // Sinon, utiliser le format classique de moment
    return target.fromNow();
  }

}
