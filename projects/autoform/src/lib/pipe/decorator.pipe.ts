import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'getDecoratorData'})
export class GetDecoratorDataPipe implements PipeTransform {
  transform(value: {[id: string]: any}, field?: string, defa?: any): any {
    if(value && value[field]) {
      return value[field]
    }
    return defa;
  }
}



