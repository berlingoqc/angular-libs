import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentRegisterService } from './service/component-register';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
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
import { AutoFormDialogComponent, AutoFormDialogPlaceholderComponent, AutoFormDialogService } from './auto-form/auto-form-dialog/auto-form-dialog.component';
import { AutoFormStepperComponent } from './auto-form/auto-form-stepper/auto-form-stepper.component';
import { AutoFormTabsComponent } from './auto-form/auto-form-tabs/auto-form-tabs.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { DictFieldComponent } from './fields/dict-field/dict-field.component';
import { DateFieldComponent } from './fields/date-field/date-field.component';
import { AutoFormBottonSheetComponent } from './auto-form/auto-form-botton-sheet/auto-form-botton-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AutoFormSimpleComponent } from './auto-form/auto-form-simple/auto-form-simple.component';
import { AUTO_FORM_TYPE_REGISTER } from './auto-form/auto-form.base';
import { ControlsModule } from './helper/form-ops/controls/controls.module';
import { MultiPartMatInputComponent } from './fields/multi-part-mat-input.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ComponentFieldService } from './fields/field.service';
import { MyMatDate } from './fields/mat-date.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DateRangeSubTypeHandler } from './models';
import { FormActionsBarComponent } from './helper/form-actions/form-actions-bar.component';
import { ButtonsRowModule, LoadingButtonModule } from '@berlingoqc/ngx-common';
import { UnionFieldComponent } from './fields/union-field/union-field.component';
import { InjectFieldDirecitve } from './fields/injector-base.component';
import { ControlRawDataPipe } from './pipe/raw-value.pipe';
import { AbstractClassFieldComponent } from './fields/abstract-class-field/abstract-class-field.component';
import { TransformValuePipe } from './pipe/transform-value.pipe';

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
        UnionFieldComponent,
        AbstractClassFieldComponent,
        MultiPartMatInputComponent,
        MyMatInput,
        MyMatSelectComponent,
        InjectFieldDirecitve,
        SliderControlComponent,
        MatErrorPipe,
        TransformValuePipe,
        ControlRawDataPipe,
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
        FormActionsBarComponent,
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
        ButtonsRowModule,
        ReactiveFormsModule,
        FormsModule,
        DataResolverModule,
        TemplateContentModule,
        CommonPipeModule,
        LoadingButtonModule,
    ],
    exports: [
        AutoFormComponent,
        ObjectFieldComponent,
        StringFieldComponent,
        NumberFieldComponent,
        AbstractClassFieldComponent,
        MultiPartMatInputComponent,
        ReactiveFormsModule,
    ],
    providers: [
        ComponentRegisterService,
        AutoFormGroupBuilder,
        ComponentFieldService,
        AutoFormDialogService,
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
    ]
})
export class AutoFormModule {
    public static forRoot(): ModuleWithProviders<AutoFormModule> {
        return {
            ngModule: AutoFormModule,
            providers: [ComponentRegisterService, AutoFormGroupBuilder],
        };
    }

    constructor(register: ComponentRegisterService) {
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
          type: 'union',
          mainComponentType: UnionFieldComponent,
          typeComponentHandler: []
        });

        register.registerComponent({
          type: 'array',
          mainComponentType: ArrayFieldComponent,
          typeComponentHandler: []
        });

        register.registerComponent({
          type: 'abstractobject',
          mainComponentType: AbstractClassFieldComponent,
          typeComponentHandler: [],
        });

        register.registerComponent({
            type: 'date',
            mainComponentType: DateFieldComponent,
            typeComponentHandler: []
        });

        register.registerSubTypeHandler('date-range', new DateRangeSubTypeHandler())


        register.registerComponent({
          type: 'dic',
          mainComponentType: DictFieldComponent,
          typeComponentHandler: []
        });

        register.registerComponent({
            type: 'bool',
            mainComponentType: BoolFieldComponent,
            typeComponentHandler: [],
        });
    }
}
