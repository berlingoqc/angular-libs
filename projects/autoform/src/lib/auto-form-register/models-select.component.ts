import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModelRegistry } from './model-registry';

@Component({
  selector: 'autoform-models-select',
  template: `
    <mat-form-field>
      <mat-label>Models disponibles</mat-label>
      <mat-select [(value)]="current">
        <mat-option *ngFor="let i of items" [value]="i">{{ i }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class ModelsSelectComponent implements OnInit {
  @Output() changes = new EventEmitter<string>();

  private _current = '';
  @Input()
  set current(v) {
    this._current = v;
    this.changes.next(v);
  }
  get current() {
    return this._current;
  }
  items: string[] = [];

  constructor(private modelRegistery: ModelRegistry) {}

  ngOnInit() {
    this.items = Object.keys(this.modelRegistery.models);
  }
}
