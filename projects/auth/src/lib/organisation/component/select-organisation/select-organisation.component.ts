import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Filter } from '@berlingoqc/ngx-loopback';
import { Organisation } from '../../model';
import { OrganisationAPI } from '../../service';
import { Observable } from 'rxjs';

@Component({
  selector: 'alb-select-organisation',
  templateUrl: './select-organisation.component.html',
  styleUrls: ['./select-organisation.component.scss'],
})
export class SelectOrganisationComponent implements OnInit {
  @Input() selectLabel = 'Organisations';
  @Input() selectHint = '';
  @Input() selectFormControl: FormControl;

  @Input() filter: Filter = {};
  @Input() orgs: Observable<Organisation[]>;

  constructor(private organisationAPI: OrganisationAPI) {}

  ngOnInit(): void {
    if (!this.orgs) {
      this.orgs = this.organisationAPI.get(this.filter);
    }
  }
}
