import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateContentData, TEMPLATE_CONTENT_CONTEXT, TEMPLATE_CONTENT_PARENT } from '../../helper/template-content/template-content-type';

export interface Button {
    title: TemplateContentData;
    style?: string;
    color?: string;
    click?: (router: Router, data: any) => void;
}

@Component({
    selector: 'app-buttons-row',
    templateUrl: './buttons-row.component.html',
    styleUrls: ['./buttons-row.component.scss'],
})
export class ButtonsRowComponent implements OnInit {
    @Input() buttons: Button[];

    constructor(
        @Optional()
        @Inject(TEMPLATE_CONTENT_CONTEXT)
        public context: any,
        @Optional()
        @Inject(TEMPLATE_CONTENT_PARENT)
        public parent: any,
        public router: Router,
    ) {}

    ngOnInit(): void {}
}
