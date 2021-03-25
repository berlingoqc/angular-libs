import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  ComponentFactory,
  ComponentFactoryResolver,
  Type,
  Input,
  OnInit,
  Component,
  ViewEncapsulation,
} from "@angular/core";

import { AuthService } from "../../auth/service";
import { take } from "rxjs/operators";
import { AuthDialogService } from '../../auth/service/auth-dialog.service';

@Directive({
  selector: "[albAskConnect]",
})
export class AskConnectDirective implements OnInit {
  component = AskConnectComponent;

  classList: string[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private authService: AuthService,
    private viewRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    if (!this.authService.isLogin) {
      this.replace();
      this.authService.loginEvents
        .asObservable()
        .pipe(take(1))
        .subscribe(() => this.setOriginal());
    } else {
      this.viewContainer.createEmbeddedView(this.viewRef);
    }
  }

  replace() {
    this.viewContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.component
    );
    const component = this.viewContainer.createComponent(factory);
    component.instance.classList = this.classList;
  }

  setOriginal() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.viewRef);
  }
}

@Component({
  selector: "alb-ask-connect",
  template: `
    <button mat-stroked-button dynStyle itemId="FIRST_BTN" (click)="authDialogService.openLogin()">
      Connectez-vous
    </button>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class AskConnectComponent {
  @Input() classList: string[];
  constructor(public authDialogService: AuthDialogService) { }
}
