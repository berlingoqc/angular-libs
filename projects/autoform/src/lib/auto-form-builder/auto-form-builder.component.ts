import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoFormData } from "dist/autoform/public-api";
import { AutoFormComponent } from "../auto-form/auto-form.component";
import { autoFormFormData } from "./auto-form.form";



@Component({
  selector: 'autoform-builder',
  templateUrl: './auto-form-builder.component.html',
  styleUrls: ['./auto-form-builder.component.html'],
})
export class AutoFormBuilderComponent implements OnInit, OnDestroy {
    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

    data: AutoFormData = autoFormFormData();

    formGroup: FormGroup;

    dataOutput: AutoFormData;


    ref: ComponentRef<AutoFormComponent>;

    constructor(
      private resolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
      this.data.event.afterFormCreated = (form) => {
        this.formGroup = form;
      };
      this.data.event.submit = (value) => {
        console.log('VALE', value, this.formGroup);
        if (this.ref) this.ref.destroy();
        const factory = this.resolver.resolveComponentFactory(
          AutoFormComponent
        );
        this.ref = this.vc.createComponent(factory);
        this.ref.instance.formData = value.object;
        this.ref.changeDetectorRef.markForCheck();
        console.log('REF', this.ref);
      };
    }

    ngOnDestroy() {
      this.ref?.destroy();
    }
}
