import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { AutoFormComponent } from "../auto-form/auto-form.component";
import { AutoFormData } from "../models";
import { autoFormFormData } from "./auto-form.form";



@Component({
  selector: 'autoform-builder',
  templateUrl: './auto-form-builder.component.html',
  styleUrls: ['./auto-form-builder.component.scss'],
})
export class AutoFormBuilderComponent implements OnInit, OnDestroy {
    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

    data: AutoFormData = autoFormFormData();

    formGroup: UntypedFormGroup;

    dataOutput: AutoFormData;


    ref: ComponentRef<AutoFormComponent>;

    constructor(
      private resolver: ComponentFactoryResolver,
    ) {

    }

    ngOnInit() {
      this.data.event.afterFormCreated = (form) => {
        this.formGroup = form;

        /*this.formGroup.valueChanges.subscribe((value) => {
          if (!this.vc || !this.formGroup.valid) return;
          if (this.ref) this.ref.destroy();
          const factory = this.resolver.resolveComponentFactory(
            AutoFormComponent
          );
          this.ref = this.vc.createComponent(factory);
          this.ref.instance.formData = value.object;
          this.ref.changeDetectorRef.markForCheck();
        });*/
      };
      this.data.event.submit = (value) => {
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
