import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getDecoratorData' })
export class GetDecoratorDataPipe implements PipeTransform {
    transform(value: { [id: string]: any }, field?: string, defa?: any): any {
        console.log('VALUE', value);
        if (value && value[field]) {
            console.log(value[field]);
            return value[field];
        }
        return defa;
    }
}
