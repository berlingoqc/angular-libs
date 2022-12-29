// import { AuthDialogComponent } from './../../../auth/component/auth-dialog/auth-dialog.component';
import { Component, OnInit, Optional } from '@angular/core';
import { UnauthorizedConfig } from '../../model/config';
import { AuthService } from '../../../auth/service/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as errorJSON from '../../error.json';
import { ErrorDetail } from '../../unauthorized-data';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthDialogService } from '../../../auth/service/auth-dialog.service';

@Component({
  selector: 'alb-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  error: number;

  detail: ErrorDetail;

  constructor(
    @Optional() private dialogRef: MatDialogRef<any>,
    public config: UnauthorizedConfig,
    public authService: AuthService,
    public authDialogService: AuthDialogService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.handle(this.route.snapshot.params.id);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  handle(id: number) {
    const errorDetail = (errorJSON as any).default;
    this.error = id;
    this.detail = errorDetail[id];
  }
}
