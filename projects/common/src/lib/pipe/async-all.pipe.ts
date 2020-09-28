import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'asyncAll',
})
export class AsyncAllPipe extends AsyncPipe {
  transform(value: any): any {
    if (value instanceof Promise || value instanceof Observable) {
      return super.transform(value as any);
    } else {
      return super.transform(of(value));
    }
  }
}
