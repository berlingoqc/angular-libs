import { Component, OnInit, Inject } from '@angular/core';
import { take } from 'rxjs/operators';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { OrganisationInvitation } from '../../model';
import { SubscriptionMessagePipe } from '@berlingoqc/ngx-common';
import { InvitationService, AuthService } from '../../../auth';

@Component({
  template: `
    <div *ngIf="!invitations || invitations.length == 0; else list">
      <h3 style="text-align: center;">Aucune invitation</h3>
    </div>

    <ng-template #list>
      <div *ngFor="let i of invitations">
        <div class="inner-card">
          <div>
            <img src="{{ i.organisation.thumbnailURL | imgSrc }}" width="100" />
          </div>
          <div class="card">
            <span>{{ i.organisation.name }}</span>
          </div>

          <div class="spacer"></div>

          <div class="inner-card">
            <button mat-icon-button (click)="respondInvitation(i, true)">
              <mat-icon>check_circle_outline</mat-icon>
            </button>
            <button mat-icon-button (click)="respondInvitation(i, false)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      img {
        border-radius: 50%;
      }

      .card {
        margin: 10px;
      }

      .inner-card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .spacer {
        flex-grow: 2;
      }
    `,
  ],
})
export class AlbInvitationBottomSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public invitations: OrganisationInvitation[],
    public ref: MatBottomSheetRef<any>,
    private subPipe: SubscriptionMessagePipe,
    private invitationService: InvitationService
  ) {}

  respondInvitation(invitation: OrganisationInvitation, accept: boolean) {
    invitation.response = accept ? 'accepted' : 'denied';
    this.subPipe
      .transform(
        this.invitationService.responseOrgInvitation(invitation.id, accept)
      )
      .then(
        () => {
          this.ref.dismiss(invitation);
        },
        (err) => {
          this.ref.dismiss();
        }
      );
  }
}

@Component({
  selector: 'alb-invitation-organisation',
  templateUrl: './invitation-organisation.component.html',
  styleUrls: ['./invitation-organisation.component.scss'],
})
export class InvitationOrganisationComponent implements OnInit {
  invitations: OrganisationInvitation[];

  constructor(
    private InvitationService: InvitationService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.InvitationService.getMyInvitation()
      .pipe(take(1))
      .subscribe((invitations) => {
        this.invitations = invitations;
      });
  }

  open() {
    this.bottomSheet
      .open(AlbInvitationBottomSheet, {
        data: this.invitations,
      })
      .afterDismissed()
      .pipe(take(1))
      .subscribe((item) => {
        if (item) {
          console.log(this.invitations);
          const i = this.invitations.findIndex((x) => x.id === item.id);
          if (i > -1) {
            this.invitations.splice(i, 1);
          }
          if (item.response === 'accepted') {
            this.authService
              .me()
              .toPromise()
              .then((x) => {
                this.authService.profile = x;
              });
          }
        }
      });
  }
}
