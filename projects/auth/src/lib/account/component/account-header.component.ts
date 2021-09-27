import { Component, Input, NgModule, Optional, ViewEncapsulation } from "@angular/core";
import { AuthSettingConfig } from '../../auth/model/auth-setting-config';


@Component({
  selector: 'account-header',
  template: `
    <div class="img-div">
        <img *ngIf="config.config.img" src="{{ config.config.img }}" />

        <h3>{{text}}</h3>
    </div>
  `,
  styleUrls: [ '../../common/shared.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountHeaderComponent {
  @Input() text: string;

  constructor(
    @Optional() public config: AuthSettingConfig,
  ) {
  }

}
