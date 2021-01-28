import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

import { AuthSettingConfig } from '../../../../auth/model/auth-setting-config';

@Component({
  selector: 'alb-accept-agrement',
  templateUrl: './accept-agrement.component.html',
  styleUrls: ['./accept-agrement.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcceptAgrementComponent),
      multi: true,
    },
  ],
})
export class AcceptAgrementComponent implements OnInit, ControlValueAccessor {
  texts: string[] = [];

  canAccept = false;

  innerAccepted = false;

  @Input() theControl: FormControl;

  get style(): any {
    if (this.theControl.touched) {
      if (this.theControl.errors && this.theControl.errors.required) {
        return 'error';
      }
    }
    return [];
  }

  onChange: (value: boolean) => void;

  constructor(
    public config: AuthSettingConfig
  ) {
    this.texts.push(config.usingContract.text);
    this.texts.push('');
  }

  ngOnInit(): void { }

  next(e: number) {
    if (e === this.texts.length - 1) {
      this.canAccept = true;
    }
  }

  registerOnChange(fn) {
    if (fn) {
      this.onChange = fn;
    }
  }

  registerOnTouched(fn) { }

  setDisabledState() { }

  writeValue(value: boolean) {
    this.innerAccepted = value;
  }

  changeBox(event) {
    this.innerAccepted = event.checked;
    if (this.onChange) {
      this.onChange(this.innerAccepted);
    }
  }
}
