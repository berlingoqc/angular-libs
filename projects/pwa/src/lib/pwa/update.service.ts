import { Inject, Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { PWAConfig, PWA_CONFIG } from './config';

@Injectable()
export class AppUpdateService {
    availableUpdate: UpdateAvailableEvent;

    constructor(
        @Inject(PWA_CONFIG) private config: PWAConfig,
        private readonly updates: SwUpdate,
        private notificationService: NotificationService,
    ) {
        if (this.updates.isEnabled) {
            this.updates.available.subscribe((event) => {
                if (this.config.autoUpdate) {
                    this.executeUpdate();
                    return;
                }
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
