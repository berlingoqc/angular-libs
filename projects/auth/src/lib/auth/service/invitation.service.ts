import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Optional, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { AuthService } from './auth.service';
import { AuthSettingConfig } from '../model/auth-setting-config';
import { AcceptedInvitation, UserProfile } from '../model';
import {
    InvitationOrganisationComponent,
    OrganisationInvitation,
} from '../../organisation';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable()
export class InvitationService {
    get url() {
        return `${this.config.backend.url}/invitation`;
    }

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService,
        private authService: AuthService,
        private bottomSheet: MatBottomSheet,
        @Optional() private config: AuthSettingConfig,
    ) {}

    activeOnConnectedMessage() {
        let connectedUser = '';
        this.authService.loginEvents.asObservable().subscribe((e) => {
            if (
                e === 'connected' &&
                this.authService.profile.id !== connectedUser
            ) {
                connectedUser = this.authService.profile.id;
                this.getMyInvitation()
                    .pipe(take(1))
                    .subscribe((invitations) => {
                        if (invitations && invitations.length > 0) {
                            this.notificationService.openNotification({
                                title: 'Invitation',
                                body: `Vous avez des demandes d'invitations en attente, allez dans votre profil`,
                                actions: [
                                    {
                                        click: () => {
                                            const invitationComponent = new InvitationOrganisationComponent(
                                                this,
                                                this.authService,
                                                this.bottomSheet,
                                            );
                                            invitationComponent.invitations = invitations;
                                            invitationComponent.open();
                                        },
                                        color: '#fefefe',
                                        text: 'Afficher mes invitations',
                                    },
                                ],
                            });
                        }
                    });
            } else {
                connectedUser = '';
            }
        });
    }

    accepteInvitation(request: AcceptedInvitation): Observable<void> {
        return this.http.patch<void>(`${this.url}/users`, request);
    }

    sendInvitation(email: string): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.url}/users`, {
            email,
        });
    }

    // Invite un usager a une organisation
    inviteUserToOrg(orgId: string, email: string): Observable<UserProfile> {
        return this.http.post<UserProfile>(
            this.url + '/org/' + orgId + '?email=' + email,
            {},
        );
    }

    // Repond a une demande d'invitation d'une organisation
    responseOrgInvitation(invitationId: number, response: boolean) {
        return this.http.patch(
            `${this.url}/org/${invitationId}?response=${response}`,
            {},
        );
    }

    // Get mes invitations
    getMyInvitation(): Observable<OrganisationInvitation[]> {
        return this.http.get<OrganisationInvitation[]>(`${this.url}/org/me`);
    }

    // Get les invitations d'une organisation
    getOrganisationInvitation(
        organisationId: string,
    ): Observable<OrganisationInvitation[]> {
        return this.http.get<OrganisationInvitation[]>(
            `${this.url}/org/${organisationId}`,
        );
    }

    deleteOrgInvitation(invitationId: number) {
        return this.http.delete(`${this.url}/org/${invitationId}`);
    }
}
