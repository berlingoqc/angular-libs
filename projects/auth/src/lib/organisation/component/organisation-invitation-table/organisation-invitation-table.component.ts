import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Organisation, OrganisationInvitation } from '../../model';
import { InvitationService } from '../../../auth/service/invitation.service';
import { SubscriptionMessagePipe } from '@berlingoqc/ngx-common';
import { dataSourceRemove } from '../../../auth/utils';
import { TranslateService } from '@ngx-translate/core';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { CRUDDataSource } from '@berlingoqc/ngx-loopback';

@Component({
  selector: 'alb-organisation-invitation-table',
  templateUrl: './organisation-invitation-table.component.html',
  styleUrls: ['./organisation-invitation-table.component.scss'],
})
export class OrganisationInvitationTableComponent
  implements OnInit, AfterViewInit {
  @Input() org: Organisation;

  @ViewChild(AutoTableComponent) table: AutoTableComponent;

  columns: TableColumn[] = [
    {
      content: {
        type: 'func',
        content: (invitation: OrganisationInvitation) => invitation.user.email,
      },
      id: 'u',
      title: {
        type: 'string',
        content: 'Usagers'
      }

    },
    {
       content: {
        type: 'func',
        content: (e) => {
          return this.translate.get(`organisation.invitation.${e.response}`);
        },
      },
      id: 'u',
      title: {
        type: 'string',
        content: 'États'
      }
    },
  ];

  lbSource: CRUDDataSource<OrganisationInvitation>;

  constructor(
    private InvitationService: InvitationService,
    private subPipe: SubscriptionMessagePipe,
    private translate: TranslateService
  ) {
    this.lbSource = {
      get: (): Observable<OrganisationInvitation[]> => {
        return this.InvitationService.getOrganisationInvitation(this.org.id);
      },
    };
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  delete(invitation: OrganisationInvitation) {
    this.subPipe
      .transform(this.InvitationService.deleteOrgInvitation(invitation.id))
      .then(() => dataSourceRemove(this.table.dataSource, invitation, 'id'));
  }
}
