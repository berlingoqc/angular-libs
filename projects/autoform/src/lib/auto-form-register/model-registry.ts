import { Injectable } from '@angular/core';
import { RegisterModels } from '../models/model-context';

@Injectable()
export class ModelRegistry {
  models: RegisterModels = {};
}
