import { Component, OnInit, Input } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ExtraField } from '../../../auth';
import { SSOSettingsService } from '../../../sso';

export const extraFieldValidatorMap: {
  [id: string]: (extraField: ExtraField) => ValidatorFn[];
} = {};

export function setValidtorForExtraField(
  id: string,
  fnGetter: (extraField: ExtraField) => ValidatorFn[]
) {
  extraFieldValidatorMap[id] = fnGetter;
}

export function getValidatorForExtraField(field: ExtraField): ValidatorFn[] {
  const v = extraFieldValidatorMap[field.name];
  if (v) {
    return v(field);
  }
  return [];
}

export function extraFieldToFormGroup(
  mode: string,
  fields: ExtraField[],
  value: any = {},
  edit = false // if edit mode true doesnt require any field
) {
  const group = {};
  fields.forEach((field) => {
    const v = value[field.name] ? value[field.name] : field.defaultValue;
    const validators = getValidatorForExtraField(field);
    if (field.required) {
      validators.push(Validators.required);
    }
    const formState = {
      value: v,
      disabled: mode === 'patch' && field.editable === false,
    };
    console.log('FORM STATE', formState, field);
    group[field.name] = new UntypedFormControl(formState, edit ? [] : validators);
  });
  return new UntypedFormGroup(group);
}

function calculateAge(birthDate: Date) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  let calculatedAge = currentYear - birthDate.getFullYear();

  if (currentMonth < birthDate.getMonth() - 1) {
    calculatedAge--;
  }
  if (
    birthDate.getMonth() - 1 === currentMonth &&
    currentDay < birthDate.getDay()
  ) {
    calculatedAge--;
  }
  return calculatedAge;
}

function validateBirthDateMinAge(minAge: number) {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    const birthDate = new Date(value);
    const age = calculateAge(birthDate);
    if (age < minAge) {
      return { minAge: true };
    }
  };
}

extraFieldValidatorMap.birthday = (extraField: ExtraField): ValidatorFn[] => {
  const validators = [];
  if (extraField.validators.minAge) {
    validators.push(validateBirthDateMinAge(extraField.validators.minAge));
  }
  return validators;
};

@Component({
  selector: 'alb-extra-fields-form',
  templateUrl: './extra-fields-form.component.html',
  styleUrls: ['./extra-fields-form.component.scss'],
})
export class ExtraFieldsFormComponent implements OnInit {
  @Input() mode: 'post' | 'patch' = 'post';
  @Input() extraFieldFormGroup: UntypedFormGroup;

  constructor(public ssoService: SSOSettingsService) { }

  ngOnInit(): void {
    console.log(this.ssoService.settings, this.extraFieldFormGroup);
  }
}
