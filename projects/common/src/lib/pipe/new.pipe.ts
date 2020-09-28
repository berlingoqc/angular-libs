import { Pipe, PipeTransform, Type } from '@angular/core';

// Call new a new signature to initialize an object from Type<any>
@Pipe({
  name: 'new',
})
export class NewPipe implements PipeTransform {
  transform(type: Type<any>, ...argv: any[]): any {
    console.log('TYPE', type);
    return new type(...argv);
  }
}
