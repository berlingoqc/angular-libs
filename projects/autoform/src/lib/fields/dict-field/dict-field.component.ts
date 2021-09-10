import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DictionnayProperty } from '../../models/properties/dict';
import { ComponentRegisterService, BaseFieldComponent } from '../../service/component-register';
import { DictFormGroup } from 'projects/autoform/src/lib/helper/form-group/dict-form-group';


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
  extends BaseFieldComponent<DictionnayProperty, DictFormGroup>
   implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    registryService: ComponentRegisterService,
  ) {
    super(registryService);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    for(const item of this.abstractControl.properties) {
      item.subChange.unsubscribe();
    }
  }

}
