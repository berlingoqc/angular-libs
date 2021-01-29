import {
  Component,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import {
  CRUDDataSource,
  StaticDataSource,
} from '@berlingoqc/ngx-loopback';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { AuthService } from '../../../auth';
import { Organisation } from '../../model';

@Component({
  selector: 'alb-organisation-table',
  templateUrl: './organisation-table.component.html',
  styleUrls: ['./organisation-table.component.scss'],
})
export class OrganisationTableComponent implements OnInit, AfterContentInit {
  columns: TableColumn[] = [
    {
      content: {type: 'func', content: (e) => e.id},
      title: {type: 'string', content: 'id'},
      id: 'id'
    },
/*    {
      elementField: 'name',
      title: 'Nom',
    },
    {
      elementField: 'type',
      title: 'Type',
    },
    */
  ];

  source: CRUDDataSource<Organisation>;

  constructor(public authService: AuthService) {
    this.source = new StaticDataSource(this.authService.profile.organisations);
  }

  ngOnInit(): void { }

  ngAfterContentInit() { }
}
