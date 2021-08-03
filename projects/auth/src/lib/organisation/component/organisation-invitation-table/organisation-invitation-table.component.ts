import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  CRUDDataSource
} from '@berlingoqc/ngx-loopback';
import {
  AutoTableComponent,
  TableColumn,
} from '@berlingoqc/ngx-autotable';
import { Organisation, OrganisationInvitation } from '../../model';
import { InvitationService } from '../../../auth/service/invitation.service';
import { SubscriptionMessagePipe, ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { dataSourceRemove } from '../../../auth/utils';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
      content: (invitation: OrganisationInvitation) =>
        invitation.user.email,
      id: 'usagers',
      title: 'Usagers',
    },
    {
      content: (e) => {
        return this.translate.get(`organisation.invitation.${e.response}`);
      },
      id: 'etat',
      title: 'État',
    },
    {
      content: {
        type: 'component',
        content: ButtonsRowComponent,
        extra: {
          inputs: {
            buttons: [
              {
                title: {
                  type: 'icon',
                  content: 'delete'
                },
                style: 'mat-mini-fab',
                click: (router: Router, invitation: any) => this.delete(invitation),
              }
            ]
          }
        }
      },
      id: 'options',
      title: 'Options'
    }
  ];

  lbSource: CRUDDataSource<any>;

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
