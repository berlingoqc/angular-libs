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
  OnInit,
} from '@angular/core';
import { FormObject } from '../models/object';
import { DecoratorsDirective } from '../directive/decorator-directive';
import { IProperty } from '../models';
import { ComponentFieldService } from './field.service';
import { Observable, Subscription } from 'rxjs';


@Directive({
  selector: '[autoFormField]'
})
export class InjectFieldDirecitve implements OnInit, OnDestroy {

  private componentRef: ComponentRef<any>;
  private mAbstractControl: AbstractControl;
  private init = false;

  private subs: Subscription[] = [];

  @Input() field: IProperty;

  @Input() set abstractControl(ab: AbstractControl) {
    this.mAbstractControl = ab;
    if (this.init) {
      this.renderFieldInTemplate(this.field, this.containerRef, this.mAbstractControl);
    }
  }
  get abstractControl() {
    return this.mAbstractControl;
  }


  constructor(
    private containerRef: ViewContainerRef,
    protected componentRegister: ComponentRegisterService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {

  }

  ngOnInit(): void {
    this.renderFieldInTemplate(
      this.field,
      this.containerRef,
      this.abstractControl,
    )
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
      t.mainComponentType
    );
    const component = ref.createComponent(factory, 0, this.injector);
    const instance = component.instance as BaseFieldComponent<any, any>;
    instance.data = field;
    instance.abstractControl = control;
    const htmlElement = component.location.nativeElement as HTMLElement;
    htmlElement.classList.add('field');
    if (field.decorators) {
      const decoratorsDirective = new DecoratorsDirective(component.location);
      decoratorsDirective.autoFormElementID = 'component';
      decoratorsDirective.autoFormDecorator = field.decorators;
    }

    component.changeDetectorRef.detectChanges();

    this.componentRef = component;
    this.field = field;

    if (this.field.valuesChanges) {
      this.subs.push(control.valueChanges.subscribe((value) => this.field.valuesChanges(control, value)));
    }
    if (this.field.initialize) {
      this.field.initialize(control);
    }
  }

  ngOnDestroy() {
    this.componentRef?.destroy();
    this.subs.forEach((sub) => sub.unsubscribe());
    //this.componentFieldService.items[this.field.name].destroy();
    //delete this.componentFieldService.items[this.field.name];
  }

}

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

  field: IProperty;

  componentRef: ComponentRef<any>;

  subs: Subscription[] = [];

  constructor(
    register: ComponentRegisterService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected injector: Injector
  ) {
    super(register);
    this.componentFieldService = this.injector.get(ComponentFieldService);
  }

  abstract getTemplateField(i: number): IProperty;

  initialize() {
    this.templates.forEach((template, i) => {
      const p = this.getTemplateField(i);
      if (p) {
        this.initContextData(p, template, i);
      }
    });
  }

  abstract getAbstractControl(
    property: IProperty,
    i: number
  ): AbstractControl;

  initContextData(
    field: IProperty,
    ref: ViewContainerRef,
    i: number
  ) {
    if (!field) {
      return;
    }
    this.renderFieldInTemplate(field, ref, i, this.getAbstractControl(field, i));
  }

  renderFieldInTemplate(
    field: IProperty,
    ref: ViewContainerRef,
    i: number,
    control: AbstractControl,
  ) {
    //if (this.componentRef) {
    //  this.componentRef.destroy();
    //  this.componentRef = null;
    //}
    const t = this.componentRegister.getRegisterComponent(field.type);
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      t.mainComponentType
    );
    const component = ref.createComponent(factory, 0, this.injector);
    const instance = component.instance as BaseFieldComponent<any, any>;
    instance.data = field;
    instance.abstractControl = control;
    const htmlElement = component.location.nativeElement as HTMLElement;
    htmlElement.classList.add('field');
    if (field.decorators) {
      const decoratorsDirective = new DecoratorsDirective(component.location);
      decoratorsDirective.autoFormElementID = 'component';
      decoratorsDirective.autoFormDecorator = field.decorators;
    }

    component.changeDetectorRef.detectChanges();

    this.componentRef = component;
    this.field = field;

    // create sub if needed
    if (this.field.valuesChanges) {
      this.subs.push(control.valueChanges.subscribe((value) => this.field.valuesChanges(control, value)));
    }
    if (this.field.initialize) {
      this.field.initialize(control);
    }

  }

  ngOnDestroy() {
    this.componentRef?.destroy();
    //this.componentFieldService.items[this.field.name].destroy();
    //delete this.componentFieldService.items[this.field.name];
  }
}
