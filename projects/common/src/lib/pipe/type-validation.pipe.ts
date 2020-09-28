import { Pipe, PipeTransform } from '@angular/core';

// Valide le type de l'object avec la fonction typeof
@Pipe({
  name: 'typeof',
})
export class TypeValidationPipe implements PipeTransform {
  transform(value: any, type: string): boolean {
    return typeof value === type;
  }
}

export type Newable<T = object> = new (...args: any[]) => T;

// Valide le type de l'object avec InstanceOf
@Pipe({
  name: 'instanceOf',
})
export class InstanceOfPipe implements PipeTransform {
  transform(value: any, type: Newable): boolean {
    return value instanceof type;
  }
}
