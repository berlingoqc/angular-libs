import { TemplateRef, Type } from '@angular/core';
import { FormObject, FormProperty } from './object';
import { FormGroup } from '@angular/forms';
import { Container } from './container';
import { TemplateContent } from '@berlingoqc/ngx-common';
import { BaseFormContainer } from './form-container/form-container';
import { AutoFormEvent } from './event';

export interface AutoFormData extends Container {
    // Templates qui peuvent être injecter autout des différents éléments.
    // La clé id est dans le format suivant:
    // `object.property:before`
    // `object:after`
    templates?: { [id: string]: TemplateContent };
    /* Type pour representer les objects du formulaire
     *
     * simple : Les objects se suivent dans la même div
     * tab : chaque object a sont propres tab
     * stepper: Chaque object est sont propre step
     */
    formGroupType?: Type<FormGroup>;

    type:
        | 'simple'
        | 'bottom-sheet'
        | 'card'
        | 'dialog'
        | 'expansion-panel'
        | 'stepper'
        | 'tabs'
        | string;
    // Représente les données propores au type de formulaire choisis (type)

    typeData?: BaseFormContainer;
    // Ensemble des FormObject qui forme le formulaire
    // TODO ACCEPTER DIRECTEMENT UN FORMOBJECT
    items: FormObject[];

    event?: AutoFormEvent;
}
