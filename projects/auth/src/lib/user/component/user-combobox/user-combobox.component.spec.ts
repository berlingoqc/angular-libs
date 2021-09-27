import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComboboxComponent } from './user-combobox.component';

describe('UserComboboxComponent', () => {
  let component: UserComboboxComponent;
  let fixture: ComponentFixture<UserComboboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComboboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
