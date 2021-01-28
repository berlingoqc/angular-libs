import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {
  Component,
  Inject,
  Optional,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NotificationD } from '../_model/notification';
import { INotificationService } from '../_service/notification.interface';
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'alb-notification',
  template: `
    <div
      *ngIf="
        notificationService.pendingNotification &&
        notificationService.pendingNotification.length > 0
      "
      class="badge"
    >
      {{ notificationService.pendingNotification.length }}
    </div>
    <div class="container" *ngIf="notification">
      <div class="notif">
        <h4>{{ notification.title }}</h4>

        <div [innerHTML]="notification.body"></div>

        <div *ngIf="notification.actions">
          <div *ngFor="let btn of notification.actions">
            <button
              mat-stroked-button
              [color]="btn.color"
              (click)="btn.click(); ref.dismiss()"
            >
              {{ btn.text }}
            </button>
          </div>
        </div>
      </div>

      <div class="column-side">
        <div *ngIf="canClose">
          <button mat-icon-button (click)="close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div *ngIf="canSearch" (click)="navigate()">
          <button mat-icon-button>
            <mat-icon>search</mat-icon>
          </button>
        </div>
        <div *ngIf="canDelete">
          <button mat-icon-button (click)="delete()">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
    <time-progress-bar [duration]="notification.duration"></time-progress-bar>
  `,
  styles: [
    `
      .badge {
        position: fixed;
        top: -10px;
        right: -10px;
        color: #fff;
        background-color: #bf1f1f;
        font-size: 16px;
        border-radius: 20px;
        border: solid 1px #c93a3a;
      }

      .container {
        display: flex;
        padding: 14px 16px;
      }

      .notif {
        width: 90%;
      }

      .column-side {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 40px;
      }
    `,
  ],
})
export class NotificationDialogComponent {
  @Input() notification: NotificationD;

  @Input() canDelete = false;
  @Input() canSearch = false;
  @Input() canClose = true;

  @Output() deleted = new EventEmitter<string>();

  constructor(
    private notificationAPI: INotificationService,
    public notificationService: NotificationService,
    @Optional()
    @Inject(MAT_SNACK_BAR_DATA)
    message: NotificationD,
    @Optional() public ref: MatSnackBarRef<NotificationDialogComponent>
  ) {
    if (this.notification) {
      this.canClose = true;
      this.canDelete = true;
    }
    if (message) {
      this.notification = message;
    }
  }

  close() {
    if (this.ref) {
      this.ref.dismiss();
    }
  }

  navigate() {}

  delete() {
    this.notificationAPI.delete(this.notification).subscribe(() => {
      this.deleted.next(this.notification.id);
    });
    this.close();
  }
}
