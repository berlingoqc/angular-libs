import { Component, Input, OnInit } from '@angular/core';
import { Where } from '@berlingoqc/ngx-loopback';
import { FormControl } from '@angular/forms';
import { UserAPI } from '../../../auth/service/user.api';
import { take } from 'rxjs/operators';

@Component({
  selector: 'alb-user-combobox',
  templateUrl: './user-combobox.component.html',
  styleUrls: ['./user-combobox.component.scss'],
})
export class UserComboboxComponent implements OnInit {
  @Input() where: Where = {};
  @Input() myControl = new FormControl();

  users: any[] = [];

  constructor(public userAPI: UserAPI) {}

  ngOnInit(): void {
    this.userAPI
      .get()
      .pipe(take(1))
      .subscribe((users) => {
        this.users = users;
      });
  }
}
