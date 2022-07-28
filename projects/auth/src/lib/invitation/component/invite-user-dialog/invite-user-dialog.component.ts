import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
  Optional,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthSettingConfig } from '../../../auth/model/auth-setting-config';
import { PasswordValidatorService } from '@berlingoqc/ngx-common';
import { UserProfile } from '../../../auth/model/user';
import { InvitationService } from '../../../auth/service/invitation.service';

export interface InviteUserSettings {
  orgId: string;
}

@Component({
  selector: 'alb-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss', '../../../common/shared.scss'],
})
export class InviteUserDialogComponent implements OnInit {
  formGroup: UntypedFormGroup;

  exceptionRequest: string;

  visible = false;

  @Output() cancel = new EventEmitter<void>();

  currentSubscription: Subscription;

  fnInviteToOrg: (email: string) => Observable<UserProfile>;

  constructor(
    public config: AuthSettingConfig,
    @Optional() @Inject(MAT_DIALOG_DATA) public settings: InviteUserSettings,
    public dialogRef: MatDialogRef<any>,
    private passwordService: PasswordValidatorService,
    private InvitationService: InvitationService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', this.passwordService.getEmailValidator()),
    });
    if (this.settings && this.settings.orgId) {
      this.fnInviteToOrg = (email) =>
        this.InvitationService.inviteUserToOrg(this.settings.orgId, email);
    } else {
      this.fnInviteToOrg = (email) => this.InvitationService.sendInvitation(email);
    }
  }

  ngOnInit(): void { }

  submit() {
    if (this.formGroup.valid) {
      this.currentSubscription = this.fnInviteToOrg(
        this.formGroup.value.email
      ).subscribe(
        (user) => {
          this.dialogRef.close(user);
          this.currentSubscription.unsubscribe();
          this.snackBar.open('Invitation envoyée', 'fermer', {
            duration: 3000,
          });
        },
        (err) => {
          this.currentSubscription.unsubscribe();
          this.dialogRef.close();
          console.log(err);
          this.snackBar.open('Erreur de la requête', 'fermer', {
            duration: 3000,
          });
        }
      );
    }
  }
}
