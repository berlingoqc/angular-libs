import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegisterService } from './service/component-register';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutoFormComponent } from './auto-form/auto-form.component';
import { StringFieldComponent } from './fields/string-field/string-field.component';
import { ObjectFieldComponent } from './fields/object-field/object-field.component';
import { ArrayFieldComponent } from './fields/array-field/array-field.component';
import { NumberFieldComponent } from './fields/number-field/number-field.component';
import { BlobFieldComponent } from './fields/blob-field/blob-field.component';
import { BoolFieldComponent } from './fields/bool-field/bool-field.component';
import { SliderControlComponent } from './fields/number-field/slider-control.component';
import { MyMatInput } from './fields/mat-input.component';
import { MatErrorPipe } from './fields/mat-error.component';
import { MyMatSelectComponent } from './fields/mat-select.component';
import { GetDecoratorDataPipe } from './pipe/decorator.pipe';
import { FieldErrorComponent } from './fields/field-error/field-error.component';
import { DecoratorsDirective } from './directive/decorator-directive';
import { DataResolverModule, TemplateContentModule } from '@berlingoqc/ngx-common';

import { CommonPipeModule } from '@berlingoqc/ngx-common';
import { AutocompleteSubTypeHandler } from './models/properties/subtype/autocomplete';
import { AutoFormGroupBuilder } from './service/auto-form-group-builder';
import { AutoFormExpansionPanelComponent } from './auto-form/auto-form-expansion-panel/auto-form-expansion-panel.component';
import { AutoFormCardComponent } from './auto-form/auto-form-card/auto-form-card.component';
import { AutoFormDialogComponent, AutoFormDialogPlaceholderComponent } from './auto-form/auto-form-dialog/auto-form-dialog.component';
import { AutoFormStepperComponent } from './auto-form/auto-form-stepper/auto-form-stepper.component';
import { AutoFormTabsComponent } from './auto-form/auto-form-tabs/auto-form-tabs.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { DictFieldComponent } from './fields/dict-field/dict-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { AutoFormBottonSheetComponent } from './auto-form/auto-form-botton-sheet/auto-form-botton-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AutoFormSimpleComponent } from './auto-form/auto-form-simple/auto-form-simple.component';
import { AUTO_FORM_TYPE_REGISTER } from './auto-form/auto-form.base';
import { ControlsModule } from './helper/form-ops/controls/controls.module';
import { MultiPartMatInputComponent } from './fields/multi-part-mat-input.component';
import { MatSelectModule } from '@angular/material/select';
import { ComponentFieldService } from './fields/field.service';
import { MyMatDate } from './fields/mat-date.component';
import { MatNativeDateModule } from '@angular/material/core';

/* AutoForm, automatic form power by Angular Material and Reactive Form
 *
 *
 *
 *
 */

@NgModule({
    declarations: [
        AutoFormComponent,
        StringFieldComponent,
        NumberFieldComponent,
        BlobFieldComponent,
        BoolFieldComponent,
        ObjectFieldComponent,
        ArrayFieldComponent,

        MultiPartMatInputComponent,

        MyMatInput,
        MyMatSelectComponent,

        SliderControlComponent,
        MatErrorPipe,
        GetDecoratorDataPipe,
        DecoratorsDirective,
        FieldErrorComponent,
        AutoFormExpansionPanelComponent,
        AutoFormCardComponent,
        AutoFormDialogComponent,
        AutoFormDialogPlaceholderComponent,
        AutoFormStepperComponent,
        AutoFormTabsComponent,
        DictFieldComponent,
        DateFieldComponent,
        AutoFormSimpleComponent,
        AutoFormBottonSheetComponent,
        MyMatDate,
    ],
    imports: [
        CommonModule,
        ControlsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatStepperModule,
        MatChipsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatCardModule,
        MatExpansionModule,
        MatTabsModule,
        MatBottomSheetModule,
        ReactiveFormsModule,
        FormsModule,

        DataResolverModule,
        TemplateContentModule,
        CommonPipeModule,
    ],
    exports: [
        AutoFormComponent,
        ObjectFieldComponent,
        StringFieldComponent,
        NumberFieldComponent,
        MultiPartMatInputComponent,
        ReactiveFormsModule,
    ],
    providers: [
        ComponentRegisterService,
        AutoFormGroupBuilder,
        ComponentFieldService,
        {
            provide: AUTO_FORM_TYPE_REGISTER,
            useValue: {
                simple: AutoFormSimpleComponent,
                'bottom-sheet': AutoFormBottonSheetComponent,
                card: AutoFormCardComponent,
                dialog: AutoFormDialogPlaceholderComponent,
                'expansion-panel': AutoFormExpansionPanelComponent,
                stepper: AutoFormStepperComponent,
                tabs: AutoFormTabsComponent,
            },
        },
    ],
    entryComponents: [
        StringFieldComponent,
        BoolFieldComponent,
        ArrayFieldComponent,
        BlobFieldComponent,
        NumberFieldComponent,
        ObjectFieldComponent,
        AutoFormComponent,
        AutoFormSimpleComponent,

        AutoFormBottonSheetComponent,
        AutoFormCardComponent,
        AutoFormExpansionPanelComponent,
        AutoFormStepperComponent,
        AutoFormTabsComponent,
    ],
})
export class AutoFormModule {
    public static forRoot(): ModuleWithProviders<AutoFormModule> {
        return {
            ngModule: AutoFormModule,
            providers: [ComponentRegisterService, AutoFormGroupBuilder],
        };
    }

    constructor(private register: ComponentRegisterService) {
        register.registerComponent({
            type: 'string',
            mainComponentType: StringFieldComponent,
            typeComponentHandler: [],
        });
        register.registerComponent({
            type: 'number',
            mainComponentType: NumberFieldComponent,
            typeComponentHandler: [],
        });
        register.registerComponent({
            type: 'object',
            mainComponentType: ObjectFieldComponent,
            typeComponentHandler: [],
        });
        register.registerSubTypeHandler(
            'autocomplete',
            new AutocompleteSubTypeHandler(),
        );
        register.registerComponent({
            type: 'date',
            mainComponentType: DateFieldComponent,
            typeComponentHandler: []
        });
        register.registerComponent({
            type: 'bool',
            mainComponentType: BoolFieldComponent,
            typeComponentHandler: [],
        });
    }
}
