import { Component, ComponentFactoryResolver, ComponentRef, Inject, Input, OnDestroy, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { AutoFormComponent } from '../auto-form/auto-form.component';
import { AutoFormData } from '../models';
import { DEFAULT_AUTO_FORM } from '../models/model-context';
import { FormRegistry } from './form-registry';
import { ModelRegistry } from './model-registry';

@Component({
    selector: 'lib-auto-form-register',
    template: `<ng-template #vc></ng-template>`,
})
export class AutoFormRegisterComponent implements OnInit, OnDestroy {
    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
    // Le nom du forms a loader
    @Input() forms: string;
    // Le noms du model a venir injecter dans le form, si aucune utilise lui
    // par default
    @Input() model: string;

    formData: AutoFormData;
    autoFormComponent: ComponentRef<AutoFormComponent>;

    constructor(
        @Optional()
        @Inject(DEFAULT_AUTO_FORM)
        private defaultAutoForm: AutoFormData,
        private modelRegister: ModelRegistry,
        private formRegister: FormRegistry,
        private resolver: ComponentFactoryResolver,
    ) {}

    ngOnInit(): void {}

    loadForm(data: any) {
        // Regarde si le nom de model et de forms sont fournis directement
        this.formData = null;

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

        if (this.autoFormComponent) {
          this.autoFormComponent.destroy();
        }

        const factory = this.resolver.resolveComponentFactory(AutoFormComponent);
        this.autoFormComponent = this.vc.createComponent(factory);
        this.autoFormComponent.instance.formData = this.formData;
        this.autoFormComponent.changeDetectorRef.markForCheck();
    }

    ngOnDestroy(): void {
      this.autoFormComponent?.destroy();
    }
}
