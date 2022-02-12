import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { filter, switchMap } from "rxjs/operators";
import { ActionConfirmationDialogComponent } from "./action-confirmation-dialog/action-confirmation-dialog.component";


@Injectable()
export class ActionConfirmationService {


  constructor(
    private matDialog: MatDialog,
  ) {}

  confirmBefore<T>(data: any, matDialogConfig: MatDialogConfig = {}): (obs: Observable<T>) => Observable<T> {
      return (obs) => {
        return this.matDialog.open(ActionConfirmationDialogComponent, Object.assign(matDialogConfig, { data })).afterClosed().pipe(
          filter(x => x),
          switchMap(() => obs)
        )
      }
  }
}
