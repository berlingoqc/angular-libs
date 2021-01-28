import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from '../model';

@Component({
  selector: 'alb-organisation-card',
  template: `
    <div class="top-card" *ngIf="org">
      <img class="card-img" [src]="org.thumbnailURL | imgSrc" />
      <span class="spacer"></span>
      <span>
        {{ org.name }}
      </span>
    </div>
  `,
  styles: [
    `
      .top-card {
        display: flex;
      }
      .card-img {
        border-radius: 50%;
        width: 100px;
      }
    `,
  ],
})
export class OrganisationCardComponent implements OnInit {
  @Input() org: Organisation;

  constructor() { }

  ngOnInit() {
  }
}
