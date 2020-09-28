import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KeyValueFormComponent } from './component/key-value-form/key-value-form.component';
import { PasswordValidatorService } from './service/password-validator.service';
import { PasswordFormFieldComponent } from './component/password-form-field/password-form-field.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    declarations: [KeyValueFormComponent, PasswordFormFieldComponent],
    exports: [KeyValueFormComponent, PasswordFormFieldComponent],
    providers: [PasswordValidatorService],
})
export class FormExtraModule {}
