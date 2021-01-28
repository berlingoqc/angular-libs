import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderEmail } from '../../model/email-template';

@Component({
  selector: 'alb-email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent implements OnInit {
  _currentPreview: RenderEmail;
  @Input() set currentPreview(c: RenderEmail) {
    this._currentPreview = c;
    this.body = this.sanitizer.bypassSecurityTrustHtml(
      this._currentPreview.body
    );
  }

  body: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }
}
