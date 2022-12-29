import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
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
  form: UntypedFormGroup;
  constructor(
    private ref: MatDialogRef<NewOrganisationComponent>,
    private orgAPI: OrganisationAPI,
    private orgUserLinkAPI: OrgUserLinkAPI,
    private userAPI: UserAPI
  ) {}

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      managerId: new UntypedFormControl('', [Validators.required]),
      name: new UntypedFormControl('', [Validators.required]),
      type: new UntypedFormControl('orgUser'),
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
