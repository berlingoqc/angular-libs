import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
    FormArray,
    UntypedFormGroup,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    UntypedFormControl,
} from '@angular/forms';

@Component({
    selector: 'bsl-key-value-form',
    templateUrl: './key-value-form.component.html',
    styleUrls: ['./key-value-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => KeyValueFormComponent),
            multi: true,
        },
    ],
})
export class KeyValueFormComponent implements OnInit, ControlValueAccessor {
    _keys;
    @Input() set keys(s: { [id: string]: string }) {
        this._keys = s;
        const ctl = {};
        Object.entries(s).forEach(([k, v]) => {
            ctl[k] = new UntypedFormControl('');
            this.items.push({ k, v });
        });
        this.formGroup = new UntypedFormGroup(ctl);
        this.formGroup.valueChanges.subscribe((data) => {
            if (this.fnChange) {
                this.fnChange(data);
            }
        });
    }

    get keys(): { [id: string]: string } {
        return this._keys;
    }

    formGroup: UntypedFormGroup;

    fnChange;

    items: any[] = [];

    constructor() {}

    ngOnInit(): void {}

    registerOnChange(fn) {
        this.fnChange = fn;
    }

    registerOnTouched() {}

    writeValue(v: any) {}
}
