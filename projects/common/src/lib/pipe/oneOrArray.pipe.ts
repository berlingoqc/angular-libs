import { Pipe, PipeTransform } from '@angular/core';

export type OneOrArray<T> = T | T[];

@Pipe({
  name: 'oneOrArray',
})
export class OneOrArrayPipe<T> implements PipeTransform {
  transform(value: OneOrArray<T>, index: number): T {
    if (value instanceof Array) {
      return value[index];
    }
    return value;
  }
}
