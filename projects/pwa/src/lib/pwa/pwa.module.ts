import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotificationModule } from '@berlingoqc/ngx-notification';
import { AppUpdateService } from './update.service';

@NgModule({
    imports: [NotificationModule],
    providers: [AppUpdateService],
})
export class PWAModule {
    constructor(updateService: AppUpdateService) {}
}
