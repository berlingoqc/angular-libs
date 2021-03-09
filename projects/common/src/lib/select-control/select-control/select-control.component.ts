import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncAllValue } from '../../pipe/async-all.pipe';

@Component({
    selector: 'lib-select-control',
    templateUrl: './select-control.component.html',
    styleUrls: ['./select-control.component.scss'],
})
export class SelectControlComponent implements OnInit {
    @Input() name: AsyncAllValue<string>;
    @Input() data: AsyncAllValue<any[]>;

    @Input() display: {
        display: (a: any) => AsyncAllValue<string>;
        value: (a: any) => AsyncAllValue<string>;
    };

    @Input() myControl: FormControl;

    constructor() {}

    ngOnInit(): void {}
}
