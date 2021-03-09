import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectControlComponent } from './select-control/select-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonPipeModule } from '../pipe/common-pipe.module';

@NgModule({
    declarations: [SelectControlComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,

        CommonPipeModule,
    ],
    exports: [SelectControlComponent],
})
export class SelectControlModule {}
