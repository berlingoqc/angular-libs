import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'autoform-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  @Input() text: string;
  @Input() control: UntypedFormControl;
  @Input() errorName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
