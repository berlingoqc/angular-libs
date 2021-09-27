import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'transform',
  pure: true,
})
export class TransformValuePipe implements PipeTransform {

  transform(value: any, func: (any) => any) {
    return func ? func(value): value;
  }
}
