import { Constructor } from "@angular/material/core/common-behaviors/constructor";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AutoFormGroup } from "./auto-form-group";


export interface IOptionalFormGroupMixin extends AutoFormGroup {}

export const OptionalFormGroupMixin = <T extends Constructor<AutoFormGroup>> (base: T) => {
  return class extends base {
    getActionObservable(): Observable<void> {
      return super.getActionObservable().pipe(
        tap(() =>
          (this.formObject.optional) ? this.disable(): null),
        switchMap(() => this.valueChanges.pipe(map((value) => {
          if (value) this.enable();
        })))
      );
    }
  }
}
