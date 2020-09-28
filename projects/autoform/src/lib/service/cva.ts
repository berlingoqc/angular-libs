import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  DefaultValueAccessor,
} from '@angular/forms';
import { forwardRef, Type } from '@angular/core';

export function ngValueAccessor(t: Type<any>) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => t),
    multi: true,
  };
}

export class CVA<T> implements ControlValueAccessor {
  fnChange: (v: T) => void;
  fnTouch: (v: T) => void;

  _model: T;

  disable: boolean;

  set model(m: T) {
    this._model = m;
    if (this.fnChange) {
      this.fnChange(m);
    }
  }

  get model(): T {
    return this._model;
  }

  registerOnChange(fnChange) {
    this.fnChange = fnChange;
  }

  registerOnTouched(fnTouch) {
    this.fnTouch = fnTouch;
  }

  setDisabledState(d) {
    this.disable = d;
  }

  writeValue(value: any) {
    this._model = value;
  }
}
