import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationModule } from '@berlingoqc/ngx-notification';
import { AppUpdateService } from './update.service';

@NgModule({
    imports: [NotificationModule, MatSnackBarModule],
    providers: [AppUpdateService],
})
export class PWAModule {
    constructor(updateService: AppUpdateService) {}
}
