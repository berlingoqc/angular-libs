import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { AuthSettingConfig } from '../model/auth-setting-config';
import { TokenService } from '.';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthDialogService {
    ssoInfoComponent: ComponentType<any>;
    inviteUserComponent: ComponentType<any>;
    component: ComponentType<any>;

    subs: Subscription[] = [];

    constructor(
        private config: AuthSettingConfig,
        private matDialog: MatDialog,
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router,
        private tokenService: TokenService,
    ) {
        this.component = this.config.component;

        this.subs.push(
            this.tokenService.beforeTokenExpired
                .asObservable()
                .subscribe(() => this.beforeExpired()),
        );

        this.subs.push(
            this.tokenService.tokenExpired
                .asObservable()
                .subscribe(() => this.onExpired()),
        );
    }

    openLogin(mode = 'login'): MatDialogRef<any, any> {
        const ref = this.matDialog.open(this.component, {
            maxWidth: '650px',
            height: '95%',
            data: {
                mode,
            },
        });
        return ref;
    }

    openLogout() {
        this.authService.logout();
    }

    openInviteUser(orgId?: string): MatDialogRef<any, any> {
        return this.matDialog.open(this.inviteUserComponent, {
            width: '40%',
            height: '40%',
            data: {
                orgId,
            },
        });
    }

    private beforeExpired() {
        this.authService.refreshSession().subscribe(() => {
            console.log('TOKEN REFRESHED');
        });
    }

    private onExpired() {
        this.renewNotification('Votre session est expirée');
        this.openLogout();
        this.router.navigate(['/']);
        console.log('EXPIRED');
    }

    private renewNotification(title: string) {
        this.notificationService.openNotification({
            title,
            body: 'Cliquez sur le bouton pour renouveler votre session',
            actions: [
                {
                    text: 'Reconnectez-vous',
                    color: 'primary',
                    click: () => {
                        this.openLogin();
                    },
                },
            ],
        });
    }
}
