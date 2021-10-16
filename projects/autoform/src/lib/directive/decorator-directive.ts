import { Directive, ElementRef, Input, Type } from '@angular/core';


export interface CustomDecorator {
  type: Type<any>;
  resolver: (location: ElementRef<HTMLElement>) => any[];
  inputs: { [id: string]: any};
}

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
    if (decorator?.custom && decorator.custom instanceof Array) {
      for(const customDectorator of decorator.custom as CustomDecorator[]) {
        const instance = new customDectorator.type(...customDectorator.resolver(this.elementRef));
        console.log('Add instance of ', customDectorator.type.name, instance);
      }
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
