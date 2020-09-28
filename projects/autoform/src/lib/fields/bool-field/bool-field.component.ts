import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFieldComponent } from '../../service/component-register';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autoform-bool-field',
  templateUrl: './bool-field.component.html',
  styleUrls: ['./bool-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoolFieldComponent
  extends BaseFieldComponent<any, FormControl>
  implements OnInit {
  ngOnInit(): void {
    if (!this.data.subtype) {
      this.data.subtype = {};
    }
  }
}
