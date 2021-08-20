import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  ViewChildren,
  TemplateRef,
  QueryList,
  AfterViewInit,
  Injector,
  ViewContainerRef,
  Type,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { FormObject } from '../../models/object';
import { ComponentRegisterService } from '../../service/component-register';
import { IProperty } from '../../models';

@Component({
  selector: 'autoform-object-field',
  templateUrl: './object-field.component.html',
  styleUrls: ['./object-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ObjectFieldComponent
  extends InjectorBaseFieldComponent<FormObject, FormGroup>
  implements OnInit, AfterViewInit {
  constructor(
    register: ComponentRegisterService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    super(register, componentFactoryResolver, injector);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.initialize();
  }

  getTemplateField(i: number): IProperty {
    return this.data.properties[i];
  }

  getAbstractControl(property: IProperty, i: number): AbstractControl {
    return this.abstractControl.get(property.name);
  }
}
