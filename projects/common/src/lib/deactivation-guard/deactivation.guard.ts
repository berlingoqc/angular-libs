import { Observable } from 'rxjs';
import {
  Injectable,
  Component,
  inject,
  InjectionToken,
  Type,
  Inject,
  Optional,
} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

export const PENDING_CHANGE_COMPONENT = new InjectionToken<Type<any>>(
  'pending_change_component'
);

@Component({
  template: `
    <p>Voulez-vous vraiment quitter cette page ?</p>
    <p>Toute progression non sauvegardé sera perdu</p>
    <div>
      <button mat-stroked-button (click)="ref.close(true)">Oui</button>
      <button mat-stroked-button (click)="ref.close(false)">Non</button>
    </div>
  `,
})
export class ActiveChangeComponent {
  constructor(@Optional() public ref: MatDialogRef<any>) {}
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  constructor(
    private matDialog: MatDialog,
    @Inject(PENDING_CHANGE_COMPONENT) private component: Type<any>
  ) {}
  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    return component.canDeactivate() ? true : this.dialog();
  }

  dialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(ActiveChangeComponent);
    return dialogRef.afterClosed();
  }
}
