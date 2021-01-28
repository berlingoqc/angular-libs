import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { Role } from '../../auth/model/user';
import { AuthService } from '../../auth/service';
import { Subscription } from 'rxjs';
import { validateOrgRessourceAccess } from '../guard';

@Directive({
  selector: '[albOrgUser]',
})
export class OrgUserDirective implements OnInit, OnDestroy {
  @Input() albOrgUserId: string;
  @Input() albOrgUserType?: string;
  @Input() albOrgUserManager?: boolean;
  @Input() albOrgUserRoles?: Role | Role[];

  sub: Subscription;

  render = false;

  constructor(
    private authService: AuthService,
    private viewRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.sub = this.authService.loginEvents
      .asObservable()
      .subscribe((event) => {
        if (event === 'connected' && !this.render) {
          this.ngOnInit();
        } else if (event === 'disconnected') {
          this.viewContainer.clear();
          this.render = false;
        }
      });
  }

  ngOnInit() {
    if (this.authService.profile) {
      if (
        validateOrgRessourceAccess(
          {
            manager: this.albOrgUserManager,
            orgId: this.albOrgUserId,
            roles: this.albOrgUserRoles,
            type: this.albOrgUserType,
          },
          this.authService.profile.id,
          this.authService.profile.organisations
        )
      ) {
        this.viewContainer.createEmbeddedView(this.viewRef);
        this.render = true;
      }
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
