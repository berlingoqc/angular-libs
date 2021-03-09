import { AsyncPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';

export type AsyncAllValue<T = any> = Promise<T> | Observable<T> | T;

@Pipe({
    name: 'asyncAll',
})
export class AsyncAllPipe extends AsyncPipe {
    transform(value: AsyncAllValue): any {
        if (value instanceof Promise || value instanceof Observable) {
            return super.transform(value as any);
        } else {
            return super.transform(of(value));
        }
    }
}
