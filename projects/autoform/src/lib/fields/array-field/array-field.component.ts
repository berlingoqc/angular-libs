import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormControl } from '@angular/forms';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { FormProperty } from '../../models/object';
import { take } from 'rxjs/operators';
import { ArrayProperty } from '../../models';
import { ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';

@Component({
  selector: 'autoform-array-field',
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArrayFieldComponent
  extends InjectorBaseFieldComponent<ArrayProperty, FormArray>
  implements OnInit, AfterViewInit {
  i = 0;
  items: number[] = [];

  initAfterInit = false;

  get canAdd(): boolean {
    if (this.data.max && this.data.max < this.i) {
      return false;
    }
    return true;
  }

  canDelete(index: number): boolean {
    if (this.data.min && index > this.data.min) {
      return false;
    }
    return true;
  }

  constructor(
    private builder: AutoFormGroupBuilder,
    register: ComponentRegisterService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    super(register, componentFactoryResolver, injector);
  }

  ngOnInit(): void {
    if (this.data.min > 0) {
      const size = this.data.min;
      for (let i = 0; i < size; i++) {
        this.addControl();
      }
      this.initAfterInit = true;
    }
  }

  ngAfterViewInit() {
    if (this.initAfterInit) {
      for (let i = 0; i < this.items.length; i++) {
        this.initContextData(
          this.data.item,
          this.templates.toArray()[i + 1],
          i
        );
      }
      this.initAfterInit = false;
    }
  }

  addItem() {
    const l = this.addControl();
    this.templates.changes.pipe(take(1)).subscribe(() => {
      // LE +1 je comprnds pas
      this.initContextData(
        this.getTemplateField(l),
        this.templates.toArray()[l + 1],
        l
      );
    });
  }

  addControl() {
    this.i += 1;
    const l = this.items.push(this.i) - 1;
    const abstractControl = this.builder.loopFormProperty(this.data.item);
    this.abstractControl.controls.push(abstractControl);
    return l;
  }

  trackBy(index: number, name: any): number {
    return name;
  }

  deleteIndex(index: number) {
    this.items.splice(index, 1);
    this.abstractControl.controls.splice(index, 1);
    this.i -= 1;
  }

  moveBefore() {}

  moveAfter() {}

  getTemplateField(i: number): FormProperty {
    return this.data.item;
  }

  getAbstractControl(property: FormProperty, i: number) {
    return this.abstractControl.controls[i];
  }
}
