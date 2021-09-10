import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbstractFormGroup } from '../../helper/form-group/abstract-form-group';
import { FormAbstractObject } from '../../models/properties/abstract-object';
import { BaseFieldComponent } from '../../service/component-register';

@Component({
    selector: 'abstract-class-form-field',
    templateUrl: './abstract-class-field.component.html',
})
export class AbstractClassFieldComponent
    extends BaseFieldComponent<FormAbstractObject, AbstractFormGroup>
    implements OnInit
{
    dataSelectControl: FormControl;
    dataSelect; // SelectOptions

    sub: Subscription;

    ngOnInit(): void {
        this.dataSelectControl = new FormControl(this.data.abstractClassName)
        this.dataSelect = {
            select: {
                name: 'select',
                type: 'mat',
                options: {
                    displayContent: (e) => e,
                    displayTitle: (e) => e,
                    options: {
                        value: [
                            this.data.abstractClassName,
                            ...this.data.childs.map((child) => child.name),
                        ],
                    },
                },
            },
        };
        this.sub = this.dataSelectControl.valueChanges.subscribe((value) => {
          this.abstractControl.selectChildType(value);
        });
    }
}
