import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AutoFormModule } from "../auto-form.module";
import { AutoFormBuilderComponent } from "./auto-form-builder.component";




@NgModule({
  imports: [
    CommonModule,
    AutoFormModule,
  ],
  declarations: [AutoFormBuilderComponent]
})
export class AutoFormBuilderModule {}
