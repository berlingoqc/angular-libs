import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injectable,
    OnInit,
    Optional,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { resolveData } from '@berlingoqc/ngx-common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
        <h2 *ngIf="formData?.templates && formData.templates['header']">
          <template-content [content]="formData.templates['header']">
          </template-content>
        </h2>
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
            <button mat-button [disabled]="!formGroup.valid" (click)="submit()">
                Confirm
            </button>
        </mat-dialog-actions>
    `,
})
export class AutoFormDialogComponent implements OnInit {
    get formData(): AutoFormData {
        return this.data?.formData;
    }
    get formGroup(): FormGroup {
        return this.data?.formGroup;
    }

    constructor(
      @Inject(MAT_DIALOG_DATA) private data: any,
      private dialogRef: MatDialogRef<any>,
    ) {}

    ngOnInit(): void {
            if (this.formData.event?.afterFormCreated) {
              this.formData.event.afterFormCreated(this.formGroup);
            }
            if (this.formData.event?.initialData) {
              resolveData(this.formData.event.initialData)
                .pipe(take(1))
                .subscribe((data) => {
                  console.log('INITIAL DATA', data);
                  // Neeed to adjust the

                  this.formGroup.patchValue(data);
                });
            }
    }

    submit() {
      this.dialogRef.close(this.formGroup.value);
      if (this.formData.event) {
        const ret = this.formData.event.submit(this.formGroup.value)
        if(ret && ret instanceof Observable) {
          console.log(ret);
          ret.subscribe(() => {});
        }
      }
      console.log('RESETING');
      this.formGroup.reset({emitEvent: false});
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


@Injectable()
export class AutoFormDialogService {
  constructor(private matDialog: MatDialog, private autoFormBuilder: AutoFormGroupBuilder) {}

  open(formData: AutoFormData) {
    return this.matDialog.open(AutoFormDialogComponent, {
      ...formData.typeData,
      data: {
        formData: formData,
        formGroup: this.autoFormBuilder.getFormGroup(formData),
      }
    })
  }
}
