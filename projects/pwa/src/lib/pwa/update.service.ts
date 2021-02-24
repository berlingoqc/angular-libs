import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { NotificationService } from '@berlingoqc/ngx-notification';

@Injectable()
export class AppUpdateService {
    availableUpdate: UpdateAvailableEvent;

    constructor(
        private readonly updates: SwUpdate,
        private notificationService: NotificationService,
    ) {
        if (this.updates.isEnabled) {
            this.updates.available.subscribe((event) => {
                this.availableUpdate = event;
                this.notificationService.openNotification({
                    title: 'Nouvelle mise à jour disponible',
                    body: '',
                    deleted: true,
                    actions: [
                        {
                            text: 'Update',
                            color: 'primary',
                            click: () => {
                                this.executeUpdate();
                            },
                        },
                    ],
                });
            });

            this.updates.checkForUpdate().then(() => {});
        } else {
            console.warn('SERVICE WORKER are disabled...');
        }
    }

    executeUpdate() {
        window.location.reload();
    }
}
