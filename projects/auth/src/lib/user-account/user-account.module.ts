import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OrganisationModule } from "../organisation";
import { AdminPageModule } from "../common/admin-page.module";
import { UserAccountComponent } from "./user-account.component";
import { UserModule } from "../user/user.module";
import { LayoutExtraModule } from "@berlingoqc/ngx-common";




@NgModule({
  imports: [
    CommonModule,
    AdminPageModule,

    LayoutExtraModule,
    OrganisationModule,
    UserModule,
  ],
  declarations: [
    UserAccountComponent
  ],
  exports: []
})
export class UserAccountModule {

}
