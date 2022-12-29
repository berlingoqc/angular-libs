import {Constructor} from "@angular/cdk/table";
import { Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { AutoFormGroup } from "./auto-form-group";


type OptionalFormGroupMixin = <T extends Constructor<AutoFormGroup>> (base: T) => T;
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
