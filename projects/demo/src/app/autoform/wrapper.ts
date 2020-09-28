import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AutoFormRegister,
  AutoFormRegisterComponent,
  FormRegistry,
  ModelRegistry,
} from 'projects/autoform/src/public-api';
import { baseForm, baseObject, baseObject2 } from './forms';

@Component({
  template: `
    <autoform-models-select
      [current]="current"
      (changes)="changeForm($event)"
    ></autoform-models-select>
    <router-outlet></router-outlet>
  `,
})
export class BaseComponent implements OnInit {
  current = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.current = this.activatedRoute.snapshot.queryParams.model;
  }

  changeForm(name: string) {
    console.log('NAVIGATE THIS');
    this.router.navigate(['autoform'], {
      queryParamsHandling: 'merge',
      queryParams: {
        model: name,
      },
    });
  }
}

@NgModule({
  declarations: [BaseComponent],
  imports: [
    AutoFormRegister,
    RouterModule.forChild([
      {
        path: '',
        component: BaseComponent,
        children: [
          {
            path: '',
            component: AutoFormRegisterComponent,
          },
        ],
      },
    ]),
  ],
  exports: [],
})
export class AutoFormRegisterWrapperModule {
  constructor(modelRegister: ModelRegistry, formRegistery: FormRegistry) {
    modelRegister.models['one'] = baseObject;
    modelRegister.models['two'] = baseObject2;
    formRegistery.forms['base'] = baseForm;
  }
}
