import { AbstractControl } from '@angular/forms';
import {
  BaseFieldComponent,
  ComponentRegisterService,
} from '../service/component-register';
import {
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector,
  Input,
  Directive,
  OnDestroy,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { FormObject } from '../models/object';
import { DecoratorsDirective } from '../directive/decorator-directive';
import { IProperty } from '../models';
import { Observable, of, Subscription } from 'rxjs';

// faire une directive de base
// avec le code pour generer l'element
// et le delete
// et ca va etre la base pour les autres
// comme le optional for now

 @Directive({
    selector: '[autoFormField]',
})
export class InjectFieldDirecitve implements OnInit, OnDestroy {
    private componentRef: ComponentRef<any>;
    private mAbstractControl: AbstractControl;
    private init = false;

    private subs: Subscription[] = [];

    private mField: IProperty;
    @Input() set field(field: IProperty) {
        this.mField = field;
    }
    get field() {
        return this.mField;
    }

    @Input() set abstractControl(ab: AbstractControl) {
        this.mAbstractControl = ab;
        if (this.init) {
            this.renderFieldInTemplate(
                this.field,
                this.containerRef,
                this.mAbstractControl,
            );
        }
    }
    get abstractControl() {
        return this.mAbstractControl;
    }

    constructor(
        private containerRef: ViewContainerRef,
        protected componentRegister: ComponentRegisterService,
        protected componentFactoryResolver: ComponentFactoryResolver,
        protected injector: Injector,
    ) {}

    ngOnInit(): void {
        if (!this.field) {
            return;
        }
        this.renderFieldInTemplate(
            this.field,
            this.containerRef,
            this.abstractControl,
        );
        this.init = true;
    }

    private renderFieldInTemplate(
        field: IProperty | FormObject,
        ref: ViewContainerRef,
        control: AbstractControl,
    ) {
        if (this.componentRef) {
            this.containerRef.clear();
            this.componentRef.destroy();
            this.componentRef = null;
        }
        const t = this.componentRegister.getRegisterComponent(field.type);
        const factory = this.componentFactoryResolver.resolveComponentFactory(
            t.mainComponentType,
        );
        const component = ref.createComponent(factory, 0, this.injector);
        const instance = component.instance as BaseFieldComponent<any, any>;
        instance.data = field;
        instance.abstractControl = control;
        const htmlElement = component.location.nativeElement as HTMLElement;
        htmlElement.classList.add('field');

        if (field.decorators) {
            const decoratorsDirective = new DecoratorsDirective(
                component.location,
            );
            decoratorsDirective.autoFormElementID = 'component';
            decoratorsDirective.autoFormDecorator = field.decorators;
        }

        component.changeDetectorRef.detectChanges();

        this.componentRef = component;
        this.field = field;

        if (this.field.valuesChanges) {
            this.subs.push(
                control.valueChanges.subscribe((value) =>
                    this.field.valuesChanges(control, value),
                ),
            );
        }
        if (this.field.initialize) {
            this.field.initialize(control);
        }
    }

    ngOnDestroy() {
        this.componentRef?.destroy();
        this.subs?.forEach((sub) => sub.unsubscribe());
    }
}
