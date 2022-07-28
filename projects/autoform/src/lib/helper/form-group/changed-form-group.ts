import { UntypedFormGroup } from '@angular/forms';

/**
 * FormGroup but you got a dictonnary
 * of the fields changes since last commit
 * it's like a transaction system for form
 */
export class ChangedFormGroup extends UntypedFormGroup {}
