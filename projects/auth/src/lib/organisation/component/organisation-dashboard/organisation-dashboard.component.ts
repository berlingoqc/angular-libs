import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { OrganisationTableComponent } from '../organisation-table/organisation-table.component';
import { OrganisationAPI } from '../../service';
import { NewOrganisationComponent } from '../new-organisation/new-organisation.component';

@Component({
  selector: 'alb-organisation-dashboard',
  templateUrl: './organisation-dashboard.component.html',
  styleUrls: ['./organisation-dashboard.component.scss'],
})
export class OrganisationDashboardComponent implements OnInit {
  @ViewChild(OrganisationTableComponent) table: OrganisationTableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organisationApi: OrganisationAPI,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addOrganisation() {
    this.matDialog
      .open(NewOrganisationComponent, {
        minHeight: '300px',
        minWidth: '600px',
      })
      .afterClosed()
      .subscribe(() => {});
  }
}
