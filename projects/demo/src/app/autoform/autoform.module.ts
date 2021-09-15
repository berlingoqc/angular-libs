import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FancyLabel } from './models';
import { AutoFormRegisterWrapperModule } from './wrapper';
import { AutoFormBuilderModule, AutoFormModule } from 'projects/autoform/src/public-api';

@NgModule({
    declarations: [FancyLabel],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,

        AutoFormModule,
        AutoFormBuilderModule,

        AutoFormRegisterWrapperModule,
    ],
    entryComponents: [FancyLabel],
    providers: [DatePipe],
    exports: [],
})
export class AutoformModule {}
