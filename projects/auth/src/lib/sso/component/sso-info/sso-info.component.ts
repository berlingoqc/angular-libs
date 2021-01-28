import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SSOSettingsService } from '../../service/sso.service';

@Component({
  selector: 'alb-sso-info',
  templateUrl: './sso-info.component.html',
  styleUrls: ['./sso-info.component.scss']
})
export class SsoInfoComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public sso: SSOSettingsService
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      emailRedirect: new FormControl(this.sso.settings.emailRedirect),
      emailFrom: new FormControl(this.sso.settings.emailFrom),
      emailHost: new FormControl(this.sso.settings.email.host + ' ' + this.sso.settings.email.auth.user),

      tokenExpiresIn: new FormControl(this.sso.settings.tokenExpiresIn),

      publicCreation: new FormControl(this.sso.settings.sso.publicCreation),
      multiFactor: new FormControl(this.sso.settings.sso.multiFactor),
      accountValidation: new FormControl(this.sso.settings.sso.accountValidation),

      min: new FormControl(this.sso.settings.password.min),
      max: new FormControl(this.sso.settings.password.max),
      caseLetter: new FormControl(this.sso.settings.password.upperLetter),
      symbol: new FormControl(this.sso.settings.password.symbol),
      repetition: new FormControl(true),
      numeric: new FormControl(false),
    });
  }

}
