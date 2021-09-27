import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { UserProfile, AuthService } from '../../../auth';
import { AuthSettingConfig } from '../../../auth/model/auth-setting-config';

@Component({
    selector: 'alb-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss', '../../../common/shared.scss'],
})
export class UserEditComponent implements OnInit {
    formGroup: FormGroup;

    exceptionRequest: string;
    detail: UserProfile;

    constructor(
        private authService: AuthService,
        @Optional() public dialogRef: MatDialogRef<any>,
        public config: AuthSettingConfig,
        public notificationService: NotificationService,
    ) {
        this.detail = this.authService.profile;
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            email: new FormControl(this.detail.email),
            telephone: new FormControl(''),
            firstname: new FormControl(this.detail.firstname),
            lastname: new FormControl(this.detail.lastname),
        });
    }

    submit() {
        if (this.formGroup.valid) {
            const value = this.formGroup.value;
            this.authService
                .updateMe({
                    email: value.email,
                    firstName: value.firstname,
                    lastName: value.lastname,
                } as any)
                .subscribe((p) => {
                    this.authService.profile.email = p.email;
                    this.authService.profile.firstname = value.firstname;
                    this.authService.profile.lastname = value.lastname;
                    this.authService.profileUpdated.next(
                        this.authService.profile,
                    );
                    if (this.dialogRef) {
                        this.dialogRef.close();
                    }
                    this.notificationService.openNotification({
                        title: 'Vos données sont modifiées',
                        body: '',
                        duration: 3000,
                    });
                });
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
}

@Component({
    selector: 'alb-user-edit-button',
    template: `
        <button
            [ngClass]="config.config.itemClass['SECOND_BTN']"
            (click)="open()"
        >
            Mon compte
        </button>
    `,
})
export class OpenUserEditButton {
    constructor(public config: AuthSettingConfig, private dialog: MatDialog) {}

    open() {
        this.dialog.open(UserEditComponent);
    }
}
