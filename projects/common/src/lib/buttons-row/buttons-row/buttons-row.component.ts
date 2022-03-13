import { Component, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { TemplateContentData, TEMPLATE_CONTENT_CONTEXT, TEMPLATE_CONTENT_PARENT } from '../../helper/template-content/template-content-type';

export interface Button {
    title: TemplateContentData;
    style?: string;
    color?: string;
    // call on render only , if false hide the element
    if?: (data: any) => boolean;
    disabled?: Observable<boolean>;
    click?: (router: Router, data: any) => void | Observable<void>;
}

@Component({
    selector: 'app-buttons-row',
    templateUrl: './buttons-row.component.html',
    styleUrls: ['./buttons-row.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ButtonsRowComponent implements OnInit {
    @Input() buttons: Button[];

    @Input() context: any;
    @Input() parent: any;

    loading = false;

    constructor(
        @Optional()
        @Inject(TEMPLATE_CONTENT_CONTEXT)
        context: any,
        @Optional()
        @Inject(TEMPLATE_CONTENT_PARENT)
        parent: any,
        public router: Router,
    ) {
      if (context) {
        this.context = context;
      }
      if (parent) {
        this.parent = parent;
      }
    }

    ngOnInit(): void {
      // filter the buttons to resolve enabled or if
      this.buttons = this.buttons.filter((x) => !x.if || x.if(this.context));
    }

    public handleClick(button: Button) {
      const ret = button.click(this.router, this.context);
      if (ret) {
        if (ret instanceof Observable) {
          this.loading = true;
          ret.pipe(take(1),finalize(() => (this.loading = false))).subscribe(() => this.loading = false, () => this.loading = false)
        }
      }
    }
}
