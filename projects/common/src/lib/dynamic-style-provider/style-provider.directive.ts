import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { DynamicStyleRegisterService } from './dynamic-style-register.service';

@Directive({
  selector: '[dynStyle]'
})
export class DynamicStyleDirective implements OnInit {

  @Input() itemId: string;

  constructor(private provider: DynamicStyleRegisterService,private el: ElementRef) {
 }

  ngOnInit() {
    const item = this.provider.getItem(this.itemId);
    (this.el.nativeElement as HTMLElement).classList.add(...item.classList);

  }

}
