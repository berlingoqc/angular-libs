import { NgModule } from '@angular/core';
import { NotificationModule } from '../notifications/notification.module';
import { NotificationService } from '../notifications/_service/notification.service';
import { OfflineModule } from './offline.module';
import { OfflineService } from './offline.service';

@NgModule({
  imports: [NotificationModule, OfflineModule],
})
export class OfflineNotificationModule {
  constructor(
    private notificationService: NotificationService,
    private offlineService: OfflineService
  ) {
    this.offlineService.event.asObservable().subscribe((isOnline) => {
      this.notificationService.openNotification({
        title: isOnline
          ? 'Vous êtes connecté à internet'
          : 'Vous avez perdu votre connection',
        body: isOnline ? '' : '',
        duration: 3000,
      });
    });
  }
}
