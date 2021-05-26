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
  OnDestroy,
  ComponentRef,
} from '@angular/core';
import { FormProperty, FormObject } from '../models/object';
import { DecoratorsDirective } from '../directive/decorator-directive';
import { IProperty } from '../models';
import { ComponentFieldService } from './field.service';
import { Observable } from 'rxjs';

@Directive()
export abstract class InjectorBaseFieldComponent<
  T extends IProperty,
  C extends AbstractControl
> extends BaseFieldComponent<T, C> implements OnDestroy {
  @ViewChildren(TemplateRef, { read: ViewContainerRef }) templates: QueryList<
    ViewContainerRef
  >;

  //@Input() data: T;
  @Input() abstractControl: C;

  @Input() configChange: Observable<any>;

  components: BaseFieldComponent<any, any>[] = [];

  componentFieldService: ComponentFieldService;

  field: IProperty | FormObject;

  componentRef: ComponentRef<any>;

  constructor(
    register: ComponentRegisterService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {
    super(register);
    this.componentFieldService = this.injector.get(ComponentFieldService);
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

    //const decoratorsDirective = new DecoratorsDirective(component.location);
    //decoratorsDirective.autoFormElementID = 'component';
    //decoratorsDirective.autoFormDecorator = field.decorators;

    component.changeDetectorRef.detectChanges();

    this.componentRef = component;

    this.field = field;
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
    //this.componentFieldService.items[this.field.name].destroy();
    //delete this.componentFieldService.items[this.field.name];
  }
}
