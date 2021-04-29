import { Component, OnInit } from '@angular/core';
import { BaseAutoFormComponent } from '../auto-form.base';


@Component({
  template: ''
})
export class AutoFormDialogComponent extends BaseAutoFormComponent implements OnInit {

  ngOnInit(): void {}

}


@Component({
  selector: 'lib-auto-form-dialog',
  template: ''
})
export class AutoFormDialogPlaceholderComponent extends BaseAutoFormComponent implements OnInit {

  ngOnInit(): void {
    this.exposition['open'] = (data: any) => this.open(data);
  }


  open(data: any) {
    console.log('OPENNING', data);
  }

}
