import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from '../../model';
import { OrganisationAPI } from '../../service';

@Component({
  selector: 'alb-organisation-manager-dashboard',
  templateUrl: './organisation-manager-dashboard.component.html',
  styleUrls: ['./organisation-manager-dashboard.component.scss'],
})
export class OrganisationManagerDashboardComponent implements OnInit {
  @ViewChild('invitationTable') inviTable: any;

  org: Organisation;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organisationApi: OrganisationAPI,
  ) { }

  ngOnInit(): void {
    const orgId = this.activatedRoute.snapshot.params.orgId;
    this.organisationApi.getById(orgId).subscribe((org) => (this.org = org));
  }
}
