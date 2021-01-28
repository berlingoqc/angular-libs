import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../auth';
import { AuthSettingConfig } from '../../../auth/model/auth-setting-config';

@Component({
  selector: 'alb-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss'],
})
export class UserNameComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public config: AuthSettingConfig,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.profileUpdated.asObservable().subscribe((x) => { });
  }
}
