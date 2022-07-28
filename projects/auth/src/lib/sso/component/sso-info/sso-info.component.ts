import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { SSOSettingsService } from '../../service/sso.service';

@Component({
  selector: 'alb-sso-info',
  templateUrl: './sso-info.component.html',
  styleUrls: ['./sso-info.component.scss']
})
export class SsoInfoComponent implements OnInit {

  formGroup: UntypedFormGroup;

  constructor(
    public sso: SSOSettingsService
  ) { }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      emailRedirect: new UntypedFormControl(this.sso.settings.emailRedirect),
      emailFrom: new UntypedFormControl(this.sso.settings.emailFrom),
      emailHost: new UntypedFormControl(this.sso.settings.email.host + ' ' + this.sso.settings.email.auth.user),

      tokenExpiresIn: new UntypedFormControl(this.sso.settings.tokenExpiresIn),

      publicCreation: new UntypedFormControl(this.sso.settings.sso.publicCreation),
      multiFactor: new UntypedFormControl(this.sso.settings.sso.multiFactor),
      accountValidation: new UntypedFormControl(this.sso.settings.sso.accountValidation),

      min: new UntypedFormControl(this.sso.settings.password.min),
      max: new UntypedFormControl(this.sso.settings.password.max),
      caseLetter: new UntypedFormControl(this.sso.settings.password.upperLetter),
      symbol: new UntypedFormControl(this.sso.settings.password.symbol),
      repetition: new UntypedFormControl(true),
      numeric: new UntypedFormControl(false),
    });
  }

}
