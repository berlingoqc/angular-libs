import {
  Component,
  OnInit,
  AfterContentInit,
  ViewChild,
  Input,
} from '@angular/core';
import {
  CRUDDataSource,
  StaticDataSource,
} from '@berlingoqc/ngx-loopback';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { AuthService } from '../../../auth';
import { Organisation } from '../../model';
import { OrganisationAPI } from '../../service/org.api';
import { Router } from '@angular/router';

@Component({
  selector: 'alb-organisation-table',
  templateUrl: './organisation-table.component.html',
  styleUrls: ['./organisation-table.component.scss'],
})
export class OrganisationTableComponent implements OnInit, AfterContentInit {
  @ViewChild(AutoTableComponent) public autoTable: AutoTableComponent;
  @Input() mode: 'user' | 'all' = 'user';
  columns: TableColumn[] = [
    {
      content: (e) => e.id,
      id: 'id',
      title: 'ID',
    },
    {
      content: (e) => e.name,
      id: 'name',
      title: 'Nom',
    },
    {
      content: (e) => e.type,
      id: 'type',
      title: 'Type',
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
                  content: 'manage_accounts'
                },
                if: (context: Organisation) => this.authService.isAdmin || context.managerId === this.authService.profile.id,
                style: 'mat-mini-fab',
                click: (router: Router, org: Organisation) => router.navigate(['/','orgs', 'manage', org.id])
              }
            ]
          }
        }
      },
      id: 'options',
      title: 'Options'
    }
  ];

  source: CRUDDataSource<Organisation>;

  constructor(
    private orgAPI: OrganisationAPI,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.source =
      this.mode === 'user'
        ? new StaticDataSource(this.authService.profile.organisations)
        : this.orgAPI;
    console.log(this.source);
  }

  ngAfterContentInit() {}
}
