import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  Self,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl,
  MAT_FORM_FIELD,
} from '@angular/material/form-field';
import { Subject, Subscription } from 'rxjs';
import { IProperty } from '../models';
import { MultiInputMatInput } from '../models/component/multi-input-mat-input';

@Component({
  selector: 'autoform-multipart-matinput',
  template: `
    <div role="group" class="input-container" [formGroup]="partsFormGroup">
      <ng-container
        *ngFor="let input of component.objects | entries; index as i"
      >
        <input
          #myInput
          class="input-element"
          [formControlName]="input[0]"
          [size]="input[1].size"
          [maxLength]="input[1].size"
          [placeholder]="placeholder[input[0]]"
          (input)="handleInput(partsFormGroup.controls[input[0]], i)"
        />
        <ng-container *ngIf="i < this.partsLength - 1">
          <template-content
            class="input-spacer"
            [content]="component.spacers | oneOrArray: i"
          ></template-content>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .input-container {
        display: flex;
        opacity: 0;
        transition: opacity 200ms;
      }

      .input-element {
        border: none;
        background: none;
        padding: 0;
        outline: none;
        font: inherit;
        text-align: center;
      }

      :host.floating .input-container {
        opacity: 1;
      }
    `,
  ],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: MultiPartMatInputComponent,
    },
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[id]': 'id',
    '[class.floating]': 'shouldLabelFloat',
  },
})
export class MultiPartMatInputComponent
  implements
    MatFormFieldControl<any>,
    ControlValueAccessor,
    OnDestroy,
    AfterViewInit {
  @Input()
  set component(c: MultiInputMatInput) {
    this.pComponent = c;
    if (this.pValue) {
      this.pValue = this.pComponent.transformer.transform(this.pValue);
    }
    this.createFormGroupForInput();
  }
  get component(): MultiInputMatInput {
    return this.pComponent;
  }
  // IMPLEMENTATOPM MATFORMFIELDCONTROL
  set value(v: any) {
    if (this.pComponent?.transformer) {
      this.pValue = this.pComponent.transformer.transform(v);
      this.partsFormGroup.setValue(this.pValue);
      this.stateChanges.next();
    } else {
      this.pValue = v;
    }
  }

  get value() {
    return this.pComponent.transformer.reconstruct(this.pValue);
  }

  // Permet de definir au mat-form-field ce qu'on veut comme placeholder
  // permet au user de le configurer.
  @Input()
  get placeholder() {
    return this.pPlaceholder;
  }
  set placeholder(plh) {
    // Transfrome le placeholder pour l'attribuer au champs
    this.pPlaceholder = this.pComponent.transformer.transform(plh);
    this.stateChanges.next();
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this.pRequired;
  }
  set required(value: boolean) {
    this.pRequired = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this.pDisabled;
  }
  set disabled(value: boolean) {
    this.pDisabled = coerceBooleanProperty(value);
    this.pDisabled
      ? this.partsFormGroup.disable()
      : this.partsFormGroup.enable();
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.partsFormGroup.invalid && this.partsFormGroup.dirty;
  }

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.focusMonitorSub = this.focusMonitor
      .monitor(this.elementRef, true)
      .subscribe((origin) => {
        if (this.focused && !origin) {
          this.onTouched();
        }
        this.focused = !!origin;
        this.stateChanges.next();
      });
  }

  get empty(): boolean {
    return (
      Object.values(this.partsFormGroup.value).findIndex((x) => !!x) === -1
    );
  }

  static nextId = 0;
  @Input() iProperty: IProperty;

  @ViewChildren('myInput') inputs: QueryList<HTMLInputElement>;

  pComponent: MultiInputMatInput;

  partsFormGroup: FormGroup = new FormGroup({});
  partsLength: number;

  pValue: any;
  // mat-form-field utilise OnPush donc il doit recevoir signal
  // que les trucs changes.
  stateChanges = new Subject<void>();
  // Retourne le id de l'élement qu'on veut que le mat-form-field
  // associe les labels avec
  @HostBinding() id = 'multipart-matinput-${MultiInputMatInput.nextId++}';

  // tslint:disable-next-line: no-input-rename
  @Input('aria-describedby') userAriaDescribedBy: string;
  private pPlaceholder: string;

  focused: boolean;
  private pRequired = false;
  private pDisabled = false;
  controlType?: string;
  autofilled?: boolean;

  focusMonitorSub: Subscription;

  onChange = (_: any) => {};
  onTouched = () => {};

  setDescribedByIds(ids: string[]) {
    const controlElement = this.elementRef.nativeElement.querySelector(
      '.input-container'
    );
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  onContainerClick(): void {
    let isFocus = false;
    const items = Object.entries(this.partsFormGroup.controls);
    items.forEach(([k, v], i) => {
      if (v.valid) {
        this.focusMonitor.focusVia(this.inputs.toArray()[i], 'program');
        isFocus = true;
      }

      if (i === items.length - 1 && !isFocus) {
        this.focusMonitor.focusVia(this.inputs.toArray()[0], 'program');
      }
    });
  }

  handleInput(control: AbstractControl, index: number) {
    this.autoFocusNext(control, index);
    this.onChange(this.value);
  }

  autoFocusNext(control: AbstractControl, index: number): void {
    console.log('NEXT ?', !control.errors, index);
    if (!control.errors && index + 1 < this.inputs.length) {
      this.focusMonitor.focusVia(this.inputs.toArray()[index + 1], 'program');
    }
  }

  autoFocusPrevious(
    control: AbstractControl,
    previousElement?: HTMLInputElement
  ): void {
    if (control.value.length < 1) {
      this.focusMonitor.focusVia(previousElement, 'program');
    }
  }

  private createFormGroupForInput() {
    const entries = Object.entries(this.component.objects);
    this.partsLength = entries.length;
    // Crée le form group depuis les informations de l'input
    const controls: { [id: string]: AbstractControl } = {};
    entries.forEach(([k, v]) => {
      console.log(this.pValue[k]);
      // Crée des validators pour le configuration du field
      controls[k] = new FormControl(this.pValue[k], [
        Validators.required,
        Validators.minLength(v.size),
        Validators.maxLength(v.size),
        ...(this.component.validators ?? []),
      ]);
    });
    this.partsFormGroup = new FormGroup(controls);
  }
}
