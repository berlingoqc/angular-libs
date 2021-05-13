import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export interface Validator {
      // Validators qui seront appliqués au champs
    validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
    // Validators async qui seront appliquées au champs
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];

}
