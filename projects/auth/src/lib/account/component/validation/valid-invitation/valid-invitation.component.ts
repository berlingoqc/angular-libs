import { NotificationService } from '@berlingoqc/ngx-notification';
import {
    Component,
    EventEmitter,
    OnInit,
    Optional,
    Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    PasswordConfig,
    PasswordValidatorService,
} from '@berlingoqc/ngx-common';
import {
    NavigateService,
    AuthDialogService,
    InvitationService,
} from '../../../../auth';
import { AuthSettingConfig } from '../../../../auth/model/auth-setting-config';
import { SSOSettingsService } from '../../../../sso';
@Component({
    selector: 'alb-valid-invitation',
    templateUrl: './valid-invitation.component.html',
    styleUrls: ['./valid-invitation.component.scss', '../../../../common/shared.scss'],
})
export class ValidInvitationComponent implements OnInit {
    formGroup: FormGroup;

    exceptionRequest: string;

    visible = false;

    @Output() beginning = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    @Output() end = new EventEmitter<void>();

    passwordConfig: PasswordConfig;

    constructor(
        private navigateService: NavigateService,
        private notificationService: NotificationService,
        @Optional() public config: AuthSettingConfig,
        private authDialogService: AuthDialogService,
        private InvitationService: InvitationService,
        public ssoSettings: SSOSettingsService,
        public passwordValidatorService: PasswordValidatorService,
    ) {

            this.passwordConfig = this.ssoSettings.settings.password
            this.formGroup = new FormGroup({
                otp: new FormControl(''),
                email: new FormControl(''),
                password: this.passwordValidatorService.getPasswordFormGroup(),
            });
            if (this.config.usingContract) {
                this.formGroup.addControl(
                    'contract',
                    new FormControl(false, [Validators.requiredTrue]),
                );
            }
            const search = window.location.search;
            const items = search.split('?');
            if (items[1]) {
                const kv = items[1].split('&');

                let query = {};

                kv.forEach((x) => {
                    const kv = x.split('=');
                    query[kv[0]] = kv[1];
                });

                if (query['otp'] && query['email']) {
                    this.visible = true;
                    this.beginning.next();
                    this.formGroup.controls.otp.setValue(query['otp']);
                    this.formGroup.controls.email.setValue(query['email']);
                } else {
                    this.navigateService.navigate(['/']);
                    this.cancel.next();
                }
            } else {
                this.navigateService.navigate(['/']);
                this.cancel.next();
            }
    }

    ngOnInit(): void {}

    submit() {
        if (this.formGroup.valid) {
            const request = this.formGroup.value;
            request.password = request.password.password;
            this.InvitationService.accepteInvitation(request).subscribe(
                () => {
                    this.navigateService.navigate(['/']);
                    this.end.next();
                    this.notificationService.openNotification({
                        body: `<p>Vous pouvez vous connecter avec ${request.email}</p>`,
                        title: 'Votre compte est activé',
                        actions: [
                            {
                                text: 'Connection',
                                color: '',
                                click: () => this.authDialogService.openLogin(),
                            },
                        ],
                        duration: 8000,
                    });
                },
                (e) => {
                    if (typeof e === 'object') {
                        console.error(e);
                        this.exceptionRequest = 'Erreur lors de la requête';
                    } else {
                        this.exceptionRequest = e;
                    }
                },
            );
        } else {
            this.formGroup.markAllAsTouched();
        }
    }

    onCancel() {
        this.cancel.emit();
        if (this.navigateService) {
            this.navigateService.navigate(['/']);
        }
    }
}
