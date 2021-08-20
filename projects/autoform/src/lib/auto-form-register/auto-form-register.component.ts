import { Component, Inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AutoFormComponent } from '../auto-form/auto-form.component';
import { AutoFormData } from '../models';
import { DEFAULT_AUTO_FORM } from '../models/model-context';
import { AutoFormGroupBuilder } from '../service/auto-form-group-builder';
import { ComponentRegisterService } from '../service/component-register';
import { FormRegistry } from './form-registry';
import { ModelRegistry } from './model-registry';

@Component({
  selector: 'lib-auto-form-register',
  template: ` <autoform-form *ngIf="formData" [formData]="formData"></autoform-form> `,
})
export class AutoFormRegisterComponent implements OnInit {
  @ViewChild(AutoFormComponent) autoFormComponent: AutoFormComponent;
  // Le nom du forms a loader
  @Input() forms: string;
  // Le noms du model a venir injecter dans le form, si aucune utilise lui
  // par default
  @Input() model: string;

  formGroup: FormGroup;
  formData: AutoFormData;

  constructor(
    @Optional()
    @Inject(DEFAULT_AUTO_FORM)
    private defaultAutoForm: AutoFormData,
    private modelRegister: ModelRegistry,
    private formRegister: FormRegistry,
    private builder: AutoFormGroupBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loadForm(data: any) {
    // Regarde si le nom de model et de forms sont fournis directement
    this.formData = null;
    this.formGroup = null;

    if (!data.model || !data.forms) {
      return;
    }

    this.model = data.model;
    this.forms = data.forms;
    // Recupere la definition du model
    const model = this.modelRegister.models[this.model];
    if (!model) {
      throw new Error('Model not found with key ' + this.model);
    }
    let form: AutoFormData;
    // Si on n'a juste un model , utilise le AutoFormData par default
    if (this.forms) {
      form = this.formRegister.forms[this.forms].data;
    } else {
      form = this.defaultAutoForm;
    }
    // Si on n'a pas throw une belle erreur
    if (!form) {
      throw new Error('Form nout found with key ' + this.forms);
    }
    form.items = model.items;
    this.formData = form;
    this.formGroup = this.builder.getFormGroup(this.formData);
  }

  submit() {
    if (this.formGroup.valid) {
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  clearAll() {}
}
