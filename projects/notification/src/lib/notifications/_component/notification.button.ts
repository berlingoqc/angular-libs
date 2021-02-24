import { Component, Inject, Input } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { NotificationD } from "../_model/notification";
import { INotificationService } from "../_service/notification.interface";
import { NotificationService } from '../_service/notification.service';

@Component({
  selector: 'alb-notifications',
  template: `
    <alb-notification
      *ngFor="let n of NotificationDs; index as i"
      [canDelete]="true"
      [canClose]="false"
      (deleted)="onDeleted(i)"
      [notification]="n"
    >
      NotificationD
    </alb-notification>
  `,
})
export class NotificationBottomSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public NotificationDs: NotificationD[],
    public ref: MatBottomSheetRef<any>
  ) {}

  onDeleted(index: number) {
    this.NotificationDs.splice(index, 1);
    if (this.NotificationDs.length === 0 && this.ref) {
      this.ref.dismiss();
    }
  }
}

@Component({
  selector: "alb-notification-button",
  template: `
    <button
      [ngClass]="btnClass"
      [disabled]="!notifications || notifications.length == 0"
      [matBadge]="notifications.length"
      matBadgePosition="above after"
      (click)="openSheet()"
      class="mat-with"
    >
      Vos Notifications
    </button>
  `,
})
export class NotificationButton {
  notifications: NotificationD[];

  @Input() btnClass: string[];

  constructor(
    private NotificationDService: INotificationService,
    private messaging: NotificationService,
    private bottomSheet: MatBottomSheet
  ) {
    this.messaging.onNotificationD.asObservable().subscribe((n) => {
      this.notifications.push(n);
    });
    const obs = this.NotificationDService.getNotifications()

    obs.subscribe((NotificationD) => {
      this.notifications = NotificationD;
    });
  }

  openSheet() {
    this.bottomSheet.open(NotificationBottomSheet, {
      data: this.notifications,
    });
  }
}
