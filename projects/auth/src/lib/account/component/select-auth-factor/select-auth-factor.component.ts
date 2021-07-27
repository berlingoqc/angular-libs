import { Component, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthFactor } from '../../../auth/model/factor';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'alb-select-auth-factor',
  templateUrl: './select-auth-factor.component.html',
  styleUrls: ['./select-auth-factor.component.scss']
})
export class SelectAuthFactorComponent implements AfterViewInit {
  @ViewChild('selection', { static: false }) selectionList: MatSelectionList;

  @Input() email: string;

  @Output() factorChange = new EventEmitter<string>();

  factors: AuthFactor[] = [
    //   {
    //   icon: 'textsms',
    //   mode: 'Messagerie texte'
    //  },
    {
      icon: 'email',
      mode: 'Courriel'
    }];

  constructor() { }

  ngAfterViewInit(): void {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.selectionList.selectionChange.subscribe(x => {
      // TODO FIXE ME IF NEEDED
      //this.factorChange.emit(x.option._value.icon);
      this.selectionList.deselectAll();
      x.option.selected = true;
    });
  }

}
