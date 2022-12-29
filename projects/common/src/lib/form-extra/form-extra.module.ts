import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { KeyValueFormComponent } from './component/key-value-form/key-value-form.component';
import { PasswordValidatorService } from './service/password-validator.service';
import { PasswordFormFieldComponent } from './component/password-form-field/password-form-field.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
