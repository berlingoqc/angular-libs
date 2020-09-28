import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PasswordConfig } from '../../model/password.config';
import { PasswordValidatorService } from '../../service/password-validator.service';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'bsl-password-form-field',
    templateUrl: './password-form-field.component.html',
    styleUrls: ['./password-form-field.component.scss'],
})
export class PasswordFormFieldComponent implements OnInit {
    hideConfirm = true;
    hidePassword = true;

    matcher = new CrossFieldErrorMatcher();

    @Input() passwordConfig: PasswordConfig;
    @Input() myGroup: FormGroup;
    @Input() autoComplete = true;

    onChange: (value: boolean) => void;

    constructor(public config: PasswordValidatorService) {}

    ngOnInit(): void {}
}
