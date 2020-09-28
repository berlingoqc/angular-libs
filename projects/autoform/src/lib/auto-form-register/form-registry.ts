import { Injectable } from '@angular/core';
import { RegisterForms } from '../models/model-context';

@Injectable()
export class FormRegistry {
  forms: RegisterForms = {};
}
