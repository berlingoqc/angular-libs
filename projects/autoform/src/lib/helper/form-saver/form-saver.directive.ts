import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 *  bslFormSaver , directive pour sauvegarder le contenue d'un FormGroup durant
 * la navigation dans la plateform.
 *
 * Vous devez configurer un id sur l'element qui host cette directive pour permettre
 * de l'identifié de façon persistance.
 */
@Directive({
    selector: '[bslFormSaver]',
})
export class FormSaverDirective implements OnDestroy {
    // Previx utilisé dans le local storage pour sauvegarder l'information
    static LS_PREFIX = 'bslFormSaver';

    static getLSId(id: string) {
        return `${FormSaverDirective.LS_PREFIX}_${id}`;
    }

    // Garde la référence au formgroup
    _formGroup: FormGroup;

    changedSub: Subscription;

    id: string;

    // Event qui indique que des données ont été chargé, emis même si aucune donnée
    // est présente. Vous pouvez vous hook a cette fonction pour charger vos données
    @Output('bslFormSaverLoaded') loaded = new EventEmitter<any>();

    // Recoit la reference du FormGroup a observer
    @Input('bslFormSaver')
    set formGroup(formGroup: FormGroup) {
        this._formGroup = formGroup;
        const data = localStorage.getItem(FormSaverDirective.getLSId(this.id));
        if (data) {
            this._formGroup.setValue(JSON.parse(data));
            this.loaded.next(this._formGroup.value);
        } else {
            this.loaded.next({});
        }
        this.changedSub = this._formGroup.valueChanges.subscribe((value) =>
            this.onValueChanged(value),
        );
    }
    get formGroup() {
        return this._formGroup;
    }

    constructor(elementRef: ElementRef) {
        this.id = elementRef.nativeElement.id;
        if (!this.id) {
            throw new Error(
                'bslFormSaver: id must be set on the element that host the directive',
            );
        }
    }

    ngOnDestroy() {
        if (this.changedSub) {
            this.changedSub.unsubscribe();
        }
    }

    // Lors du changement de valeur , ajout dans le localstorage
    onValueChanged(value: any) {
        localStorage.setItem(
            FormSaverDirective.getLSId(this.id),
            JSON.stringify(value),
        );
    }
}
