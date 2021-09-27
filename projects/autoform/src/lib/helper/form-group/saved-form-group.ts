import { FormGroup } from '@angular/forms';

/**
 * SavedFormGroup is a implementation of FormGroup
 * that saved it's state locally on changes or on
 * destruction and restore the data when the
 * same instance of the FormGroup is recreate
 *
 * can use different backend to save the
 * crucial DaTa.
 */
export class SavedFormGroup extends FormGroup {}
