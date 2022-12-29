import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
    providers: [DatePipe],
    exports: []
})
export class AutoformModule {}
