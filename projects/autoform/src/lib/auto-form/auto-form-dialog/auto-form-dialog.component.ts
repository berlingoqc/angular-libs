import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    Optional,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutoFormData } from '../../models';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import {
    BaseAutoFormComponent,
    AUTO_FORM_DATA,
    AUTO_FORM_INITAL_DATA,
    AUTO_FORM_EXPOSITION,
} from '../auto-form.base';

@Component({
    template: `
        <mat-dialog-content>
            <ng-container *ngIf="formData">
                <autoform-object-field
                    *ngFor="let item of data.formData.items"
                    [data]="item"
                    [abstractControl]="data.formGroup.controls[item.name]"
                ></autoform-object-field>
            </ng-container>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
            <button mat-button mat-dialog-close>Cancel</button>
            <button mat-button (click)="submit()" cdkFocusInitial>
                Confirm
            </button>
        </mat-dialog-actions>
    `,
})
export class AutoFormDialogComponent implements OnInit {
    get formData(): AutoFormData {
        return this.data?.formData;
    }
    get formGroup() {
        return this.data?.formGroup;
    }

    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<any>,
    ) {}

    ngOnInit(): void {}

    submit() {
      this.dialogRef.close(this.formGroup.value);
      if (this.formData.event) {
        this.formData.event.submit(this.formGroup.value).subscribe(() => {});
      }
    }
}

@Component({
    selector: 'lib-auto-form-dialog',
    template: '',
})
export class AutoFormDialogPlaceholderComponent
    extends BaseAutoFormComponent
    implements OnInit {
    constructor(
        @Optional() @Inject(AUTO_FORM_DATA) formData: AutoFormData,
        @Optional() @Inject(AUTO_FORM_INITAL_DATA) formInitialData: any,
        @Optional() @Inject(AUTO_FORM_EXPOSITION) exposition: any,
        autoFormBuilder: AutoFormGroupBuilder,
        private dialog: MatDialog,
    ) {
        super(formData, formInitialData, exposition, autoFormBuilder);
    }

    ngOnInit(): void {
        this.exposition['open'] = (data: any) => this.open(data);
    }

    open(data: any) {
        if (data) {
          this.formGroup.setValue(data);
        }
        return this.dialog.open(AutoFormDialogComponent, {
            ...this.typeData,
            data: {
                formData: this.formData,
                formGroup: this.formGroup,
            },
        });
    }
}
