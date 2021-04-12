import { Directive, OnInit, HostListener, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterHistoryService } from './router-history.service';

@Directive({
    selector: '[bslReturnPrevious]',
})
export class ReturnPreviousDirective implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private historyService: RouterHistoryService,
    ) {}

    // tslint:disable-next-line: no-input-rename
    @Input('bslReturnPreviousURL') returnUrl: string;

    @HostListener('click') onClick() {
        if (this.returnUrl) {
            this.historyService.navigateToItem({ url: this.returnUrl });
        } else {
            this.historyService.back();
        }
    }

    ngOnInit(): void {
        if (!this.returnUrl) {
            this.returnUrl = this.activatedRoute.snapshot.queryParams.returnURL;
        }
    }
}
