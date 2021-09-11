import { Component, OnInit } from '@angular/core';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { AbstractFormGroup } from '../../helper/form-group/abstract-form-group';
import { FormAbstractObject } from '../../models/properties/abstract-object';
import { BaseFieldComponent } from '../../service/component-register';

export class BFC extends BaseFieldComponent<FormAbstractObject, AbstractFormGroup> {}

@Component({
    selector: 'abstract-class-form-field',
    templateUrl: './abstract-class-field.component.html',
})
export class AbstractClassFieldComponent
    extends OnDestroyMixin(BFC)
    implements OnInit
{
    dataSelect; // SelectOptions

    ngOnInit(): void {
        this.dataSelect = {
            appearance: 'outline',
            displayName: 'Class',
            select: {
                name: 'select',
                type: 'mat',
                options: {
                    displayContent: (e) => e,
                    displayTitle: (e) => e,
                    value: [
                      this.data.abstractClassName,
                      ...this.data.childs.map((child) => child.name),
                    ],
                },
            },
        };

        this.abstractControl.controls[this.data.typeKey].valueChanges
          .pipe(untilComponentDestroyed(this))
          .subscribe((value) => {
            this.abstractControl.selectChildType(value);
          });
    }
}
