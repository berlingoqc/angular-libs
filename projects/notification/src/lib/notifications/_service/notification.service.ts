import { Injectable, Injector, Type } from '@angular/core';
import { NotificationD } from '../_model/notification';
import { Subject } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { setInjector } from '../global';

@Injectable()
export class NotificationService {
    onNotificationD = new Subject<NotificationD>();
    pendingNotification: NotificationD[] = [];

    snackBarComponent: Type<any>;
    ref: MatSnackBarRef<any>;

    constructor(private snackBar: MatSnackBar) {}

    openNotification(n: NotificationD) {
        this.pendingNotification.push(n);
        this.openNextNotification();
    }

    private openNextNotification() {
        if (this.ref) {
            return;
        }
        if (this.pendingNotification && this.pendingNotification.length > 0) {
            const n = this.pendingNotification.splice(0, 1)[0];
            n.duration = n.duration ?? 8000;
            this.ref = this.snackBar.openFromComponent(this.snackBarComponent, {
                data: n,
                duration: n.duration,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                direction: 'ltr',
                panelClass: 'custom-snackbar',
            });
            this.ref
                .afterDismissed()
                .pipe(take(1))
                .subscribe((x) => {
                    this.ref = null;
                    this.openNextNotification();
                });
        }
    }
}
