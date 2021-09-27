import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
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
