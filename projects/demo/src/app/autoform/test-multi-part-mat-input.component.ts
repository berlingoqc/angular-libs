import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiInputMatInput } from 'projects/autoform/src/lib/models/component/multi-input-mat-input';

@Component({
  template: `
    <mat-form-field>
      <mat-label>Suce moi</mat-label>
      <autoform-multipart-matinput
        [formControl]="formControl"
        [component]="component"
      ></autoform-multipart-matinput>
    </mat-form-field>
  `,
})
export class TestMultiPartMatInputComponent {
  formControl = new FormControl('418-233-2342');
  component: MultiInputMatInput = {
    name: 'multipart',
    objects: {
      area: {
        size: 3,
      },
      exchange: {
        size: 3,
      },
      subscriber: {
        size: 4,
      },
    },
    spacers: [
      {
        type: 'string',
        content: '-',
      },
      {
        type: 'string',
        content: '-',
      },
    ],
    transformer: {
      reconstruct: (telephone: any) => {
        if (telephone) {
          return Object.values(telephone).join('-');
        }
        return '';
      },
      transform: (telephone: string) => {
        if (telephone) {
          const split = telephone.split('-');
          return { area: split[0], exchange: split[1], subscriber: split[2] };
        }
        return { area: '', exchange: '', subscriber: '' };
      },
    },
  };
}
