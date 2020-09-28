import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autoform-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent implements OnInit {

  @Input() text: string;
  @Input() control: FormControl;
  @Input() errorName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
