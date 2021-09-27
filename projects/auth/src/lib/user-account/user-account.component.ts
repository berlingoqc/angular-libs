import { Component } from '@angular/core';

@Component({
    selector: '',
    template: `
        <alb-admin-page>
            <alb-top-card>
                <alb-user-name></alb-user-name>
            </alb-top-card>

            <ng-template albTabSection="Profile">
                <bsl-top-bar name="Votre compte"></bsl-top-bar>
                <br />
                <alb-user-edit></alb-user-edit>

            </ng-template>

            <ng-template albTabSection="Organisations">
                <bsl-top-bar name="Organisations" [right]="right"></bsl-top-bar>
                <alb-organisation-table
                    [mode]="'user'"
                ></alb-organisation-table>

                <ng-template #right>
                  <alb-invitation-organisation></alb-invitation-organisation>
                </ng-template>
            </ng-template>
        </alb-admin-page>
    `,
})
export class UserAccountComponent {}
