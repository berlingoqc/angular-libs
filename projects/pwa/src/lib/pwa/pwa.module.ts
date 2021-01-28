import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotificationModule } from "../notifications/notification.module";
import { AppUpdateService } from "./update.service";

@NgModule({
  imports: [NotificationModule, MatSnackBarModule],
  providers: [AppUpdateService],
})
export class PWAModule {
  constructor(updateService: AppUpdateService) {}
}
