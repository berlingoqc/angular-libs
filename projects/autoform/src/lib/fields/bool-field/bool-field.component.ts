import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFieldComponent } from '../../service/component-register';
import { UntypedFormControl } from '@angular/forms';
import { BoolProperty } from '../../models';

@Component({
    selector: 'autoform-bool-field',
    templateUrl: './bool-field.component.html',
    styleUrls: ['./bool-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BoolFieldComponent
    extends BaseFieldComponent<BoolProperty, UntypedFormControl>
    implements OnInit {
    ngOnInit(): void {
        if (!this.data.subtype) {
            this.data.subtype = { name: '' };
        }
    }
}
