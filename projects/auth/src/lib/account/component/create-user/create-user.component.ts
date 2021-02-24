import {
    Component,
    EventEmitter,
    OnInit,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { AuthServiceErrorComponent } from '../../../common/component/auth-service-error/auth-service-error.component';
import { PasswordValidatorService } from '@berlingoqc/ngx-common';
import { AuthService, NewUserRequest, User } from '../../../auth';
import { extraFieldToFormGroup } from '../../../user';
import { SSOSettingsService } from '../../../sso';
import { nointercept } from '../../../unauthorized/service/http-interceptor';

@Component({
    selector: 'alb-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
    @ViewChild(AuthServiceErrorComponent)
    errorComponent: AuthServiceErrorComponent;

    exceptionRequest = '';

    @Output() cancel = new EventEmitter<void>();

    formGroup: FormGroup;

    constructor(
        private notificationService: NotificationService,
        private passwordValidatorService: PasswordValidatorService,
        public ssoSettings: SSOSettingsService,
        public authService: AuthService,
    ) {
        this.formGroup = new FormGroup({
            name: new FormGroup({
                firstName: new FormControl(''),
                lastName: new FormControl(''),
            }),
            email: new FormControl(
                '',
                this.passwordValidatorService.getEmailValidator(),
            ),
            extraFields: extraFieldToFormGroup(
                'post',
                this.ssoSettings.settings.userExtraFields,
            ),
            password: this.passwordValidatorService.getPasswordFormGroup(),
        });
    }

    ngOnInit(): void {}

    create(): void {
        if (this.formGroup.valid) {
            console.log(this.errorComponent);
            console.log(this.formGroup.value);
            this.createUser({
                email: this.formGroup.value.email,
                password: this.formGroup.value.password.password,
                firstName: this.formGroup.value.name.firstName,
                lastName: this.formGroup.value.name.lastName,
                extraFields: this.formGroup.value.extraFields,
            })
                .then((x) => {
                    this.cancel.next();
                    this.notificationService.openNotification({
                        title: `Compte crée`,
                        body: `
            <p>Validez votre compte avec le email envoyé à ${this.formGroup.value.email}</p>
            `,
                    });
                })
                .catch(this.errorComponent.onErrorFunc());
        } else {
            this.formGroup.markAllAsTouched();
        }
    }

    @nointercept(400)
    async createUser(user: NewUserRequest): Promise<User> {
        return this.authService.createUser(user).toPromise();
    }

    onCancel() {
        this.cancel.next();
    }
}
