import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
    MatAutocomplete,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';

const defaultGetterFn = (s) => (s ? s.toString() : '');

@Component({
    selector: 'bsl-chip-autocomplete',
    templateUrl: './chip-autocomplete.component.html',
})
export class ChipAutoCompleteComponent<T = any> implements OnInit {
    private initialize = false;
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<T[]>;
    fruits: T[] = [];
    allFruits: T[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    // Text présent par default dans le placeholder de l'input
    @Input() textHolder: string;

    // Nombre maximal d'element qui peuvent être choisis en même temps
    @Input() maxlength: number;

    // Si lazy est true attend d'être trigger une première fois avant de resolver l'observable
    @Input() lazy = false;
    // Liste d'item déjà présent qui seront ajouter aprèes les données recu (getItems)
    @Input() presentItem: T[] = [];
    // Fonction qui est appelé pour get les items qui seront dans l'autocomplete
    @Input() getItems: () => Observable<T[]>;

    // callback quand un item est ajouté
    @Output() itemAdded = new EventEmitter<T>();
    // callback quand un item est supprimé
    @Output() itemDeleted = new EventEmitter<T>();

    // si true init les données dans ngOnInit
    @Input() autoInit = true;
    // Nom de la propriété pour le nom , par default appel toString si non null
    @Input() getName?: (i: T) => string | string = defaultGetterFn;
    // Nom de la propriété id , par default appel toString si non null
    @Input() getId?: (i: T) => string | string = defaultGetterFn;
    // Function qui est appellé quand un item est sélectionner et ajout de l'autocomplete
    // vers l'input, si null ajoute avec push a la fin de l'array
    @Input() addItem?: (all: T[], value: any) => T = (all: T[], value: any) =>
        all.find((x) => x === value);

    ngOnInit() {
        if (this.autoInit) {
            this.init();
        }
    }

    // initialise la composante , fetch les données autocomplete et assigne valeus par default
    init() {
        if (this.getName) {
            if (typeof this.getName === 'string') {
                const name = this.getName as string;
                this.getName = (d) => d[name];
            }
        }
        if (this.getId) {
            if (typeof this.getId === 'string') {
                const name = this.getId as string;
                this.getId = (d) => d[name];
            }
        }
        if (!this.lazy) {
            this.initData();
        } else {
            this.filteredFruits = of([null]);
        }
    }

    initData() {
        this.getItems().subscribe((data) => {
            this.initialize = true;
            this.allFruits = data;
            this._setFilter();
            this.presentItem.forEach((i) => this.onSelected(this.getId(i)));
        });
    }

    onOpen(event: Event) {
        if (!this.initialize) {
            this.initData();
        }
    }

    // Event quand un item du autocomplete est sélectionner
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            const item = this.addItem(this.allFruits, value);
            this.fruits.push(item);
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    // Clear tous les items et les retournes dans l'autocomplete, ne trigger par les eventEmitter
    clear() {
        for (let i = 0; i < this.fruits.length; i++) {
            this.removeAtIndex(i, false);
        }
    }

    // Appel clear et remets des valeurs par default
    clearAndReset(data: T[]) {
        this.clear();
        if (data) {
            data.forEach((d) => {
                this.onSelected(this.getId(d), false);
            });
        }
    }

    // Supprimer un élément présent dans l'input
    remove(fruit: T, emit = true): void {
        const index = this.fruits.indexOf(fruit);
        this.removeAtIndex(index, emit);
        if (this.fruits.length < this.maxlength && this.fruitCtrl.disabled) {
            this.fruitCtrl.enable();
        }
    }

    // Supprimer l'élément à l'index dans l'input
    removeAtIndex(index: number, emit = true) {
        if (index >= 0) {
            const item = this.fruits[index];
            this.allFruits.push(item);
            this.fruits.splice(index, 1);
            if (emit) {
                this.itemDeleted.emit(item);
            }
            this._setFilter();
        }
    }

    // Événement quand un item est sélectioner peux être appeller pour ajouter un item qui est dans le autocomplete
    onSelected(value: string, emit = true): void {
        const indexItem = this.allFruits.findIndex(
            (x) => this.getId(x) === value,
        );
        if (indexItem > -1) {
            const item = this.allFruits[indexItem];
            this.fruits.push(item);
            this.fruitInput.nativeElement.value = '';
            if (emit) {
                this.itemAdded.next(item);
            }
            this.fruitCtrl.setValue(null);
            this.allFruits.splice(indexItem, 1);
            this._setFilter();
        } else {
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.viewValue;
        const indexItem = this.allFruits.findIndex(
            (x) => this.getName(x) === value,
        );
        const item = this.allFruits[indexItem];
        this.fruits.push(item);
        this.fruitInput.nativeElement.value = '';
        this.itemAdded.next(item);
        this.fruitCtrl.setValue(null);
        this.allFruits.splice(indexItem, 1);
        this._setFilter();
        if (this.fruits.length === this.maxlength) {
            this.fruitCtrl.disable();
        }
    }

    private _setFilter() {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(''),
            map((fruit: any | null) =>
                fruit ? this._filter(fruit) : this.allFruits.slice(),
            ),
        );
    }

    private _filter(value: T): T[] {
        return this.allFruits.filter(
            (fruit) =>
                this.getName(fruit)
                    .toLowerCase()
                    .indexOf(this.getName(value)) === 0,
        );
    }
}
