import { NgModule, Type, ModuleWithProviders, Injector } from '@angular/core';
import { NotificationDialogComponent } from './_component/notification.component';
import {
    NotificationButton,
    NotificationBottomSheet,
} from './_component/notification.button';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import {
    INotificationService,
    URL_API,
} from './_service/notification.interface';
import { TimerProgressBarComponent } from './_component/timer-progress-bar.component';
import { NotificationService } from './_service/notification.service';
import { setInjector } from './global';
import { TemplateContentModule } from '@berlingoqc/ngx-common';

export interface NotificationModuleConfig {
    providerService?: Type<INotificationService>;
}

@NgModule({
    declarations: [
        TimerProgressBarComponent,
        NotificationBottomSheet,
        NotificationDialogComponent,
        NotificationButton,
    ],
    imports: [
        CommonModule,

        TemplateContentModule,

        MatBottomSheetModule,
        MatSnackBarModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatBadgeModule,
    ],
    providers: [NotificationService],
    exports: [
        NotificationButton,
        NotificationDialogComponent,
        NotificationBottomSheet,
    ],
    entryComponents: [NotificationBottomSheet, NotificationDialogComponent],
})
export class NotificationModule {
    public static forRoot(
        config: NotificationModuleConfig,
        url: string = '/',
    ): ModuleWithProviders<NotificationModule> {
        return {
            ngModule: NotificationModule,
            providers: [
                //{
                //    provide: INotificationService,
                //    useClass: config.providerService,
                //},
                NotificationService,
                { provide: URL_API, useValue: url },
            ],
        };
    }

    constructor(service: NotificationService, injector: Injector) {
        service.snackBarComponent = NotificationDialogComponent;
        setInjector(injector);
    }
}
