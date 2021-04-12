import { AbstractControl } from '@angular/forms';
import {
  BaseFieldComponent,
  ComponentRegisterService,
} from '../service/component-register';
import {
  ViewChildren,
  TemplateRef,
  ViewContainerRef,
  QueryList,
  Type,
  ComponentFactoryResolver,
  Injector,
  Input,
  Directive,
} from '@angular/core';
import { FormProperty, FormObject } from '../models/object';
import { DecoratorsDirective } from '../directive/decorator-directive';
import { IProperty } from '../models';

@Directive()
export abstract class InjectorBaseFieldComponent<
  T extends IProperty,
  C extends AbstractControl
> extends BaseFieldComponent<T, C> {
  @ViewChildren(TemplateRef, { read: ViewContainerRef }) templates: QueryList<
    ViewContainerRef
  >;

  //@Input() data: T;
  @Input() abstractControl: C;

  components: BaseFieldComponent<any, any>[] = [];

  constructor(
    register: ComponentRegisterService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {
    super(register);
  }

  abstract getTemplateField(i: number): FormProperty;

  initialize() {
    this.templates.forEach((template, i) => {
      const p = this.getTemplateField(i);
      this.initContextData(p, template, i);
    });
  }

  abstract getAbstractControl(
    property: FormProperty,
    i: number
  ): AbstractControl;

  initContextData(
    field: IProperty | FormObject,
    ref: ViewContainerRef,
    i: number
  ) {
    if (!field) {
      return;
    }
    const t = this.componentRegister.getRegisterComponent(field.type);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      t.mainComponentType
    );
    const component = ref.createComponent(factory, 0, this.injector);
    const instance = component.instance as BaseFieldComponent<any, any>;
    instance.data = field;
    instance.abstractControl = this.getAbstractControl(field, i);
    const htmlElement = component.location.nativeElement as HTMLElement;
    htmlElement.classList.add('field');

    const decoratorsDirective = new DecoratorsDirective(component.location);
    decoratorsDirective.autoFormElementID = 'component';
    decoratorsDirective.autoFormDecorator = field.decorators;

    component.changeDetectorRef.detectChanges();
  }
}
