import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoFormData } from '../models';
import { DEFAULT_AUTO_FORM } from '../models/model-context';
import { AutoFormGroupBuilder } from '../service/auto-form-group-builder';
import { ComponentRegisterService } from '../service/component-register';
import { FormRegistry } from './form-registry';
import { ModelRegistry } from './model-registry';

@Component({
  selector: 'lib-auto-form-register',
  template: ` <autoform-form [formData]="formData"></autoform-form> `,
})
export class AutoFormRegisterComponent implements OnInit {
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

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryparams) =>
      this.loadForm(queryparams)
    );
  }

  loadForm(data: any) {
    // Regarde si le nom de model et de forms sont fournis directement
    this.formData = null;
    this.formGroup = null;
    if (!this.model) {
      // Si non va les chercher dans le activated route data
      this.model = data.model;
      this.forms = data.forms;
    }
    // Recupere la definition du model
    const model = this.modelRegister.models[this.model];
    if (!model) {
      throw new Error('Model not found with key ' + this.model);
    }
    let form: AutoFormData;
    // Si on n'a juste un model , utilise le AutoFormData par default
    if (this.forms) {
      form = this.formRegister.forms[this.forms];
    } else {
      form = this.defaultAutoForm;
    }
    // Si on n'a pas throw une belle erreur
    if (!form) {
      throw new Error('Form nout found with key ' + this.forms);
    }
    form.items = model;
    this.formData = form;
    this.formGroup = this.builder.getFormGroup(this.formData);
  }

  submit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      console.log('FORM VALID');
      console.log(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  clearAll() {}
}
