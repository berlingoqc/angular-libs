import { compilePipeFromMetadata } from '@angular/compiler';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AutoFormData,
  AutoFormDialogService,
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
import { stepperForm } from './forms/stepper';
import { defaultValueDict, dictObject } from './models/dict';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { arrayDefault, arrayObject } from 'projects/demo/src/app/autoform/models/array';
import { abstractClassDefaultValue, abstractClassForm } from './models/abstract-class';
import { FormGroup } from '@angular/forms';

@Component({
    template: `
        <div>
          <h3>Live demo @berlingoqc/autoform</h3>

          <p>Exemple of the many use case of autoform</p>
        </div>
        <autoform-models-select
          [value]="value"
          [callback]="callback"
        ></autoform-models-select>

        <app-code-demo
          [snipets]="snipets"
        >
          <lib-auto-form-register
            (formDataApply)="(formData = $event)"
            (formGroupApply)="(formGroup = $event)"
            [autoFormEvent]="events">
          </lib-auto-form-register>
        </app-code-demo>
    `,
    styles: [`
      * {
        margin: 10px;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements AfterViewInit {
    url = "";
    @ViewChild(AutoFormRegisterComponent) autoForm: AutoFormRegisterComponent;

    snipets;
    value;

    formData: AutoFormData;
    formGroup: FormGroup;

    modelSelected: any;

    events: AutoFormEvent = {
      submit: (data) => {
        console.log('DATA', data);
      }
    }

    constructor(
      private formRegistry: FormRegistry,
      private modelsRegistry: ModelRegistry,
      public autoFormDialog: AutoFormDialogService,
      private cdRef: ChangeDetectorRef,
    ) {
      const jsonValue = localStorage.getItem('demo-autoform');
      if (jsonValue) {
        this.value = JSON.parse(jsonValue);
      }
    }

    callback = (data) => {
      localStorage.setItem('demo-autoform', JSON.stringify(data.object));
      this.modelSelected = this.modelsRegistry.models[data.object.model];
      return of(this.autoForm.loadForm({
        model: data.object.model,
        forms: data.object.form},
        this.modelSelected.default,
        {
          actionsButtons: {
            container: {
              class: ['button-row']
            },
            submit: {
              title: 'Submit',
              style: 'mat-flat-button',
              color: 'primary'
            },
            reset: {
              title: 'Reset',
              style: 'mat-flat-button',
              color: 'accent'
            },
            extra: [
              {
               title: 'setValue(default)',
               if: () => this.modelSelected?.default !== undefined,
               click: () => this.formGroup.setValue(this.modelSelected.default),
              } as any,
              {
               title: 'patchValue(default)',
               if: () => this.modelSelected?.default !== undefined,
               click: () => this.formGroup.patchValue(this.modelSelected.default),
              } as any,
              {
                title: 'Open as dialog',
                click: () => {
                  this.autoFormDialog.open(this.formData);
                }
              }
            ]
          }
        }
      )).pipe(tap(() => {
        this.snipets = [
          {
            name: 'Model',
            path: this.modelsRegistry.models[data.object.model].path,
          },
          {
            name: 'Form',
            path: this.formRegistry.forms[data.object.form].path,
          }
        ];
        this.cdRef.detectChanges();
      }));
    }

    ngAfterViewInit(): void {
      if (this.value) {
        this.callback({object: this.value}).subscribe(() => {});
      }
    }
}

@NgModule({
    declarations: [BaseComponent],
    imports: [
        CommonModule,
        MatButtonModule,
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
        modelRegister.models.dict = {
          items: dictObject,
          path: "/demo/src/app/autoform/models/dict.ts",
          default: defaultValueDict,
        };
        modelRegister.models.array = {
          items: arrayObject,
          path: "/demo/src/app/autoform/models/array.ts",
          default: arrayDefault,
        };
        modelRegister.models.abstractClass = {
          items: abstractClassForm,
          path: "/demo/src/app/autoform/models/abstract-class.ts",
          default: abstractClassDefaultValue,
        };

        formRegistery.forms.simple = {
          data: simpleForm,
          path: "/demo/src/app/autoform/forms/simple.ts",
        };

        formRegistery.forms['expensaion-panel'] = {
          data: expansionPanelForm,
          path: "/demo/src/app/autoform/forms/expandable-panel.ts",
        };

        formRegistery.forms['stepper'] = {
          data: stepperForm,
          path: "/demo/src/app/autoform/forms/stepper.ts"
        };
    }
}
