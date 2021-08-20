import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoFormData, FormObject } from '../models';
import { FormRegistry } from './form-registry';
import { ModelRegistry } from './model-registry';

@Component({
  selector: 'autoform-models-select',
  template: `
    <autoform-form [formData]="form"></autoform-form>
  `,
})
export class ModelsSelectComponent implements OnInit {

  @Input() callback: (data) => Observable<void>;

  form: AutoFormData = {
    type: 'simple',
    items: [
      {
        name: 'object',
        type: 'object',
        properties: [
          {
            name: 'form',
            type: 'string',
            displayName: 'Form available',
            component: {
              name: 'select',
              options: {
                displayTitle: 'Form available',
                displayContent: (e) => e,
                options: {
                  value: Object.keys(this.formRegistery.forms),
                }
              }
            } as any,
          },
          {
            name: 'model',
            type: 'string',
            displayName: 'Model available',
            component: {
              name: 'select',
              options: {
                displayTitle: 'Model available',
                displayContent: (e) => e,
                options: {
                  value: Object.keys(this.modelRegistery.models),
                }
              }
            } as any,
          }
        ]
      } as FormObject
    ]
  }

  constructor(
    private modelRegistery: ModelRegistry,
    private formRegistery: FormRegistry,
  ) {}

  ngOnInit() {
    this.form.event = {
      submit: this.callback,
    }
    //this.items = Object.keys(this.modelRegistery.models);
    //this.forms = Object.keys(this.formRegistery.forms)
  }
}
