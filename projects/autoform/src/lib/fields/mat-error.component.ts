import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FieldErrors } from '../models';

@Pipe({
  name: 'errorFilter',
  pure: false,
})
export class MatErrorPipe implements PipeTransform {
  transform(errors: FieldErrors, abstractControl: AbstractControl) {
    if (errors?.hours) {
      //console.log('CACACACA', abstractControl);
    }
    if (!errors) {
      return [];
    }
    let items: any = Object.entries(errors);
    items = items
      .filter(([k, _]) => {
        return abstractControl.hasError(k);
      })
      .map((x) => x[1]);
    return items;
  }
}
