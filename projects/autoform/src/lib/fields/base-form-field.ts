// Contient les inputs de bases pour les classes

import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    Input,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TemplateContent } from '@berlingoqc/ngx-common';
import { InputProperty } from '../models';
import { CVA } from '../service/cva';

// qui wrappe autour d'un formfield
@Directive({})
export class BaseFormField<IP extends InputProperty = InputProperty> extends CVA<any> implements AfterViewInit {
    // Type of the mat-input
    @Input() type: string;

    @Input() preffix: TemplateContent;
    @Input() suffix: TemplateContent;
    @Input() hint: TemplateContent;
    @Input() hintAlign: string;

    @Input() data: IP;
    @Input() abstractControl: UntypedFormControl;

    @ViewChildren('myInput') myInput: QueryList<any>;
    currentInput: HTMLInputElement | any;

    constructor(public cdr: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit() {
        this.currentInput = this.myInput.first.nativeElement;
    }
}
