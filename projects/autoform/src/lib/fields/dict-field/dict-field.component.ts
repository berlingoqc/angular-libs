import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DictionnayProperty } from '../../models/properties/dict';
import { IProperty } from '../../models';
import { ComponentRegisterService, BaseFieldComponent } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { Subscription } from 'rxjs';

type IPropertyItem = IProperty & {disabledOption?: boolean};

interface DictFieldInstance {
  control: AbstractControl;
  subChange?: Subscription;
  property?: string;
  prop?: IPropertyItem;
}

/**
 * Things that need to work
 *
 */


@Component({
  selector: 'lib-dict-field',
  templateUrl: './dict-field.component.html',
  styleUrls: ['./dict-field.component.scss'],
  // SHOULD PUT BACK BECAUSE IM USING getRawValue() in the template
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictFieldComponent
  extends BaseFieldComponent<DictionnayProperty, FormGroup>
   implements OnInit, AfterViewInit, OnDestroy {

    properties: DictFieldInstance[] = [];

    mode: string;
    propertiesAvailable: IPropertyItem[] = [];

    allPropertyFill = false;

  constructor(
    private builder: AutoFormGroupBuilder,
    private cdRef: ChangeDetectorRef,
    registryService: ComponentRegisterService,
  ) {
    super(registryService);
  }

  ngOnInit(): void {
    if (this.data.availableProperty) {
      this.mode = 'property';
      this.propertiesAvailable = this.data.availableProperty;
    } else if (this.data.availableType) {
      this.mode = 'type';
      this.propertiesAvailable = this.data.availableType;
    }

    if (this.data.spacer) {
      this.data.spacer = ':';
    }
    for (const entry of Object.entries(this.abstractControl.controls)) {
      const propertie = this.propertiesAvailable.find(prop => prop.name === entry[0]);
      if (propertie) {
        this.addProperty(propertie);
      }
    }
    // add required field if they are not there
    this.propertiesAvailable.filter(prop => prop.required).forEach((propAvailable) => {
      if (this.properties.findIndex((prop) => prop.prop.name === propAvailable.name) === -1) {
        this.addProperty(propAvailable, true);
      }
    });
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

  addProperty(propertie?: any, recreate = false) {
    const item = {
      control: new FormGroup({property: new FormControl(), type: new FormControl(propertie)}),
      subChange: null,
      propertie: '',
      prop: propertie,
    }
    if (propertie?.required) {
      item.control.controls.type.disable({onlySelf: true, emitEvent: false});
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
          item.prop = lastProperties;
          break;
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
      }
      this.cdRef.detectChanges();
    }
    item.subChange =
      item.control.controls.type.valueChanges.subscribe((value) => handleValue(value));

    if (propertie) {
      handleValue(propertie, recreate);
    }
  }

  removeProperty(index: number) {
    const properties = this.properties.splice(index, 1)[0];
    if (properties.property) {
      this.abstractControl.removeControl(properties.property);
    }
    if (properties.prop) {
      properties.prop.disabledOption = false;
      this.allPropertyFill = false;
    }
    properties.subChange.unsubscribe();
    this.cdRef.detectChanges();
  }

}
