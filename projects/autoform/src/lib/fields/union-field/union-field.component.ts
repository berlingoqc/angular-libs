import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { FormProperty } from '../../models/object';
import { take } from 'rxjs/operators';
import { ArrayProperty, UnionProperty } from '../../models';
import { ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';

@Component({
  selector: 'autoform-array-field',
  templateUrl: './union-field.component.html',
  styleUrls: ['./union-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UnionFieldComponent
  extends InjectorBaseFieldComponent<UnionProperty, FormGroup>
  implements OnInit, AfterViewInit {

  constructor(
    private builder: AutoFormGroupBuilder,
    register: ComponentRegisterService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    super(register, componentFactoryResolver, injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
