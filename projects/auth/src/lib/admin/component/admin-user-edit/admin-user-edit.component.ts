import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatLegacyChipInputEvent as MatChipInputEvent } from '@angular/material/legacy-chips';
import {
  MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent,
  MatLegacyAutocomplete as MatAutocomplete,
} from '@angular/material/legacy-autocomplete';
import { User, Role, RoleAPI } from '../../../auth';
import { UserAPI } from '../../../auth/service/user.api';
import { extraFieldToFormGroup } from '../../../user/component';
import { BaseFormDialog } from '../../../common/base-from-group';
import { SSOSettingsService } from '../../../sso';

@Component({
  selector: 'alb-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.scss', '../../../common/shared.scss'],
})
export class AdminUserEditComponent extends BaseFormDialog implements OnInit {
  user: User;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new UntypedFormControl();
  filteredFruits: Observable<Role[]>;
  originalRole: Role[] = [];
  fruits: Role[] = [];
  allFruits: Role[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  get startingDate() {
    return new Date(this.user.validUntil * 1000);
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<AdminUserEditComponent>,
    private ssoService: SSOSettingsService,
    private roleAPI: RoleAPI,
    private userAPI: UserAPI
  ) {
    super();
    this.user = data as User;
    this.formGroup = new UntypedFormGroup({
      email: new UntypedFormControl(this.user.email),
      telephone: new UntypedFormControl(this.user.phone),
      blocked: new UntypedFormControl(this.user.blocked),
      validUntil: new UntypedFormControl(
        this.user.validUntil && this.user.validUntil !== 0
          ? new Date(this.user.validUntil * 1000)
          : null
      ),
      extraFields: extraFieldToFormGroup(
        'patch',
        this.ssoService.settings.userExtraFields,
        this.user.extraFields,
        true
      ),
    });
    if (this.user.roles) {
      this.originalRole = this.user.roles.map((x) => ({ name: x.role } as any));
      this.fruits.push(...this.originalRole);
    }

    this.roleAPI.get().subscribe((roles) => {
      this.allFruits = roles;
      this.allFruits = this.allFruits.filter(
        (x) => this.fruits.findIndex((y) => y.name === x.name) === -1
      );
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(''),
        map((fruit: Role | null) =>
          fruit ? this._filter(fruit) : this.allFruits.slice()
        )
      );
    });
  }

  ngOnInit(): void { }

  getName(item: Role) {
    return item.name;
  }

  getItems(): Observable<any[]> {
    return this.roleAPI.get();
  }

  submitHandler() {
    const user = this.formGroup.value as User;
    const updatedData: any = {};
    if (user.validUntil) {
      const date = new Date(user.validUntil);
      updatedData.validUntil = date.getTime() / 1000;
      user.validUntil = updatedData.validUntil;
    } else {
      updatedData.validUntil = null;
    }

    updatedData.roles = this.fruits.map((x) => ({ role: x.name }));
    user.roles = updatedData.roles;
    user.id = this.user.id;
    user.userCredentials = this.user.userCredentials;
    updatedData.blocked = user.blocked ?? false;
    updatedData.extraFields = this.formGroup.value.extraFields;

    this.userAPI.updateById(this.user.id, updatedData).subscribe(() => {
      this.dialogRef.close(user);
    });
  }

  // CODE GESTION DE MAT-AUTOCOMPLETE

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ name: value.trim() } as any);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: Role): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.allFruits.push(this.fruits[index]);
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const indexItem = this.allFruits.findIndex(
      (x) => x.name === event.option.viewValue
    );
    this.fruits.push(this.allFruits[indexItem]);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.allFruits.splice(indexItem, 1);
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(''),
      map((fruit: Role | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  private _filter(value: Role): Role[] {
    return this.allFruits.filter(
      (fruit) => fruit.name.toLowerCase().indexOf(value.name) === 0
    );
  }
}
