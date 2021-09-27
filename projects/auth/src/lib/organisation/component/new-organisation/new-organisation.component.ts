import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { UserAPI } from '../../../auth/service/user.api';
import { Organisation } from '../../model';
import { OrganisationAPI, OrgUserLinkAPI } from '../../service';

@Component({
  selector: 'alb-new-organisation',
  templateUrl: './new-organisation.component.html',
  styleUrls: ['./new-organisation.component.scss', '../../../common/shared.scss'],
})
export class NewOrganisationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private ref: MatDialogRef<NewOrganisationComponent>,
    private orgAPI: OrganisationAPI,
    private orgUserLinkAPI: OrgUserLinkAPI,
    private userAPI: UserAPI
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      managerId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      type: new FormControl('orgUser'),
    });
  }

  submit() {
    console.log('this', this.form.valid, this.form.value);
    const value = this.form.value;
    let shadowOrg: Organisation;
    this.orgUserLinkAPI.id = value.managerId;
    this.orgAPI
      .post(value)
      .pipe(
        switchMap((org) => {
          shadowOrg = org;
          return this.userAPI.updateById(org.managerId, {
            phone: '',
            roles: [{ role: 'ORG_USER_MANAGER' }],
          });
        }),
        switchMap(() =>
          this.orgUserLinkAPI.post({
            organisationId: shadowOrg.id,
          } as any)
        )
      )
      .subscribe(() => this.ref.close());
  }
}
