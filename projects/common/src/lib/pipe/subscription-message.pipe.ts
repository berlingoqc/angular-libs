import { Pipe, PipeTransform } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Pipe({
  name: '',
})
export class SubscriptionMessagePipe<T = any> implements PipeTransform {
  constructor(private snackBar: MatSnackBar) {}

  transform(observable: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      observable.pipe(take(1)).subscribe(
        (t: T) => {
          this.displayMessage('Requête executée avec succès');
          resolve(t);
        },
        (err) => {
          console.error(err);
          this.displayMessage('Erreur lors de la requête');
          reject(err);
        }
      );
    });
  }

  private displayMessage(msg: string) {
    this.snackBar.open(msg, 'fermer', { duration: 2000 });
  }
}
