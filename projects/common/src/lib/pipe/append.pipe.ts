import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appendArray' })
export class AppendArrayPipe<T = any> implements PipeTransform {
  transform(array: T[], data: T[]): T[] {
    return [...(array ?? []), ...(data ?? [])];
  }
}
