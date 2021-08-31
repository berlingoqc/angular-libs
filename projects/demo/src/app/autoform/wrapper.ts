import { compilePipeFromMetadata } from '@angular/compiler';
import { ChangeDetectorRef, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
    AutoFormRegister,
    AutoFormRegisterComponent,
    FormRegistry,
    ModelRegistry,
} from 'projects/autoform/src/public-api';
import { of } from 'rxjs';
import { simpleObject, inputPropertyObject, dateForm } from './models';
import { simpleForm, expansionPanelForm } from './forms';
import { CodeDemoModule } from '../code-demo/code-demo.module';
import { map, tap } from 'rxjs/operators';
import { AutoFormEvent } from 'projects/autoform/src/lib/models/event';

@Component({
    template: `
        <div>
          <h3>Live demo @berlingoqc/autoform</h3>

          <p>Exemple of the many use case of autoform</p>
        </div>
        <autoform-models-select
          [callback]="callback"
        ></autoform-models-select>

        <app-code-demo
          [snipets]="snipets"
        >
          <lib-auto-form-register [autoFormEvent]="events">
          </lib-auto-form-register>
        </app-code-demo>
    `,
    styles: [`
      * {
        margin: 10px;
      }
    `],
})
export class BaseComponent {
    url = "";
    @ViewChild(AutoFormRegisterComponent) autoForm: AutoFormRegisterComponent;

    snipets;

    events: AutoFormEvent = {
      submit: (data) => {
        console.log('DATA', data);
      }
    }

    constructor(
      private formRegistry: FormRegistry,
      private modelsRegistry: ModelRegistry,
    ) {}

    callback = (data) => {
      return of(this.autoForm.loadForm({model: data.object.model, forms: data.object.form})).pipe(tap(() => {
        this.snipets = [
          {
            name: 'Model',
            path: this.modelsRegistry.models[data.object.model].path,
          },
          {
            name: 'Form',
            path: this.formRegistry.forms[data.object.form].path,
          }
        ]
      }));
    }
}

@NgModule({
    declarations: [BaseComponent],
    imports: [
        AutoFormRegister,
        CodeDemoModule,
        RouterModule.forChild([
            {
                path: '',
                component: BaseComponent,
            },
        ]),
    ],
    exports: [],
})
export class AutoFormRegisterWrapperModule {
    constructor(modelRegister: ModelRegistry, formRegistery: FormRegistry) {
        modelRegister.models['simple'] = {
          items: simpleObject,
          path: "/demo/src/app/autoform/models/simple.ts",
        };
        modelRegister.models['imput-property'] = {
          items: inputPropertyObject,
          path: "/demo/src/app/autoform/models/input-property.ts",
        };
        modelRegister.models.date = {
          items: dateForm,
          path: "/demo/src/app/autoform/models/date.ts",
        };


        formRegistery.forms.simple = {
          data: simpleForm,
          path: "/demo/src/app/autoform/forms/simple.ts",
        };
        formRegistery.forms['expensaion-panel'] = {
          data: expansionPanelForm,
          path: "/demo/src/app/autoform/forms/expandanle-panel.ts",
        };
    }
}
