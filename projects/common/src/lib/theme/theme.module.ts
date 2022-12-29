import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { ThemeManagerService } from "./theme-manager.service";
import { ThemePickerComponent } from "./theme-picker/theme-picker.component";
import { ThemeService } from "./theme.service";




@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    ThemePickerComponent,
  ],
  providers: [
    ThemeService,
    ThemeManagerService,
  ],
  exports: [
    ThemePickerComponent,
  ],
})
export class ThemeModule {}
