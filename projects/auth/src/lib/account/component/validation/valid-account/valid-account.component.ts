import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceErrorComponent } from '../../../../common';
import { AuthService, NavigateService } from '../../../../auth/service';
@Component({
  selector: 'alb-valid-account',
  templateUrl: './valid-account.component.html',
  styleUrls: ['./valid-account.component.scss'],
})
export class ValidAccountComponent implements AfterViewInit {
  isValide = false;

  @ViewChild(AuthServiceErrorComponent)
  errorComponent: AuthServiceErrorComponent;
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    public navigateService: NavigateService
  ) { }

  ngAfterViewInit(): void {
    const query = this.activeRoute.snapshot.queryParams;
    this.authService.validCreateUser(query.email, query.otp).subscribe((x) => {
      this.isValide = true;
    }, this.errorComponent.onErrorFunc());
  }
}
