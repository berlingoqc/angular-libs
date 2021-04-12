import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoFormDecorator]',
})
export class DecoratorsDirective {
  @Input() autoFormElementID: string;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @Input() set autoFormDecorator(decorator: { [id: string]: any }) {
    if (!decorator) {
      return;
    }
    if (this.autoFormElementID && decorator[this.autoFormElementID]) {
      decorator = decorator[this.autoFormElementID];
    }
    if (decorator?.class) {
      this.elementRef.nativeElement.classList.add(...decorator.class);
    }
    if (decorator?.style) {
      Object.entries(decorator.style).forEach(([k, v]) => {
        this.elementRef.nativeElement.style[k] = v;
      });
    }
  }
}
