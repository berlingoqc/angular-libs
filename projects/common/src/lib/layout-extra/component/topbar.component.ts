import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'bsl-top-bar',
    template: `
        <mat-toolbar color="primary">
            <mat-toolbar-row>
                <span>{{ name }}</span>
                <span class="example-spacer"></span>
                <ng-container [ngTemplateOutlet]="right"></ng-container>
            </mat-toolbar-row>
            <mat-toolbar-row *ngFor="let row of rows">
                <ng-container [ngTemplateOutlet]="row"></ng-container>
            </mat-toolbar-row>
        </mat-toolbar>
    `,
    styles: [
        `
            .example-spacer {
                flex: 1 1 auto;
            }
        `,
    ],
})
export class TopbarComponent {
    @Input() name: string;

    @Input() right: TemplateRef<any>;

    @Input() rows: TemplateRef<any>[] = [];
}
