import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  EmailTemplateAPI,
} from '../../service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { TableColumn } from '@berlingoqc/ngx-autotable';
import { RenderEmail, EmailTemplate } from '../../model';

@Component({
  selector: 'alb-email-template-table',
  templateUrl: './email-template-table.component.html',
  styleUrls: ['./email-template-table.component.scss'],
})
export class EmailTemplateTableComponent implements OnInit, AfterViewInit {
  @ViewChild('options', { static: false }) optionsTemplate: TemplateRef<any>;

  mode = 'table';

  columns: TableColumn[] = [];

  currentPreview: RenderEmail;
  currentEmail: EmailTemplate;

  formGroup: FormGroup;

  constructor(
    public client: EmailTemplateAPI,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.columns = [
      /*
      {
        title: 'ID',
        elementField: 'key',
      },
      {
        title: 'Description',
        elementField: 'description',
      },
      {
        title: 'Options',
        elementField: this.optionsTemplate,
      },
      */
    ];
  }

  preview(template: EmailTemplate) {
    this.mode = 'form';
    this.currentEmail = template;

    this.formGroup = new FormGroup({
      title: new FormControl(this.currentEmail.title),
      template: new FormControl(this.currentEmail.template),
      args: new FormControl(this.currentEmail.args),
    });
    this.render();
  }

  toSend(item: EmailTemplate) {
    this.mode = 'send';
    this.currentEmail = item;
    this.formGroup = new FormGroup({
      to: new FormControl('', [Validators.required]),
      args: new FormControl({}, [Validators.required]),
    });
    this.render();
  }

  save() {
    const value = this.formGroup.value;
    this.client
      .patch(this.currentEmail.key, {
        template: value.template,
        title: value.title,
      } as any)
      .pipe(take(1))
      .subscribe(() => {
        this.render();
      });
  }

  render() {
    this.client
      .renderEmail({
        data: this.formGroup.value.args,
        name: this.currentEmail.key,
        titleData: {},
      })
      .pipe(take(1))
      .subscribe((x) => {
        this.currentPreview = x;
      });
  }

  sendEmail() {
    const value = this.formGroup.value;
    this.client
      .sendRenderEmail({
        template: this.currentEmail.key,
        to: value.to,
        data: value.args,
      })
      .subscribe((x) => {
        this.currentPreview = x;
      });
  }
}
