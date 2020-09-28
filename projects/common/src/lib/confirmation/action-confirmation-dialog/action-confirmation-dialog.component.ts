import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'bsl-action-confirmation-dialog',
    templateUrl: './action-confirmation-dialog.component.html',
    styleUrls: ['./action-confirmation-dialog.component.scss'],
})
export class ActionConfirmationDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ActionConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit(): void {}
}
