import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { DictionnayProperty } from '../../models/properties/dict';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { IProperty } from '../../models';
import { ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { Subscription } from 'rxjs';

type IPropertyItem = IProperty & {disabledOption?: boolean};

interface DictFieldInstance {
  control: AbstractControl;
  subChange?: Subscription;
  property?: string;
  config?: IPropertyItem;
}


@Component({
  selector: 'lib-dict-field',
  templateUrl: './dict-field.component.html',
  styleUrls: ['./dict-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictFieldComponent
  extends InjectorBaseFieldComponent<DictionnayProperty, FormGroup>
   implements OnInit, AfterViewInit, OnDestroy {

    properties: DictFieldInstance[] = [];


    mode: string;
    propertiesAvailable: IPropertyItem[] = [];


    allPropertyFill = false;


  constructor(
    private builder: AutoFormGroupBuilder,
    private cdRef: ChangeDetectorRef,
    register: ComponentRegisterService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
  ) {
    super(register, componentFactoryResolver, injector);
  }

  ngOnInit(): void {
    if (this.data.availableProperty) {
      this.mode = 'property';
      this.propertiesAvailable = this.data.availableProperty;
    } else if (this.data.availableType) {
      this.mode = 'type';
      this.propertiesAvailable = this.data.availableType;
    }
    for (const entry of Object.entries(this.abstractControl.controls)) {
      const propertie = this.propertiesAvailable.find(prop => prop.name === entry[0]);
      if (propertie) {
        this.addProperty(propertie);
      }
    }
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    for(const item of this.properties) {
      item.subChange.unsubscribe();
    }
  }

  getTemplateField(i: number): IProperty {
    return null;
  }

  getAbstractControl(property: IProperty, i: number): AbstractControl {
    return this.abstractControl.get(property.name);
  }

  addProperty(propertie?: any) {
    const item = {
      control: new FormGroup({property: new FormControl(), type: new FormControl(propertie)}),
      subChange: null,
      propertie: '',
      config: null,
    }
    this.properties.push(item);
    let lastProperties = propertie;
    const handleValue = (value, recreate = true) => {
      item.propertie = value.name;
      if (lastProperties) {
        lastProperties.disabledOption = false;
        this.allPropertyFill = false;
      }

      for (const prop of this.propertiesAvailable) {
        if(prop.name === value.name) {
          prop.disabledOption = true;
          lastProperties = prop;
          item.config = lastProperties;
        } else {
          this.allPropertyFill = prop.disabledOption;
        }
      }
      if (!this.propertiesAvailable.some(x => !x.disabledOption)) {
        this.allPropertyFill = true;
      }
      if (recreate) {
        if (this.abstractControl.controls[value.name]) {
          this.abstractControl.removeControl(value.name);
        }
        this.abstractControl.addControl(value.name, this.builder.loopFormProperty(value));
        this.cdRef.detectChanges();
      }
    }
    item.subChange = item.control.controls.type.valueChanges.subscribe((value) => handleValue(value));

    if (propertie) {
      handleValue(propertie, false);
    }
  }

  removeProperty(index: number) {
    const properties = this.properties.splice(index, 1)[0];
    if (properties.property) {
      this.abstractControl.removeControl(properties.property);
    }
    if (properties.config) {
      properties.config.disabledOption = false;
      this.allPropertyFill = false;
    }
    properties.subChange.unsubscribe();
    this.cdRef.detectChanges();
  }

}
