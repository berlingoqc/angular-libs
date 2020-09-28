import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormFieldComponent } from './password-form-field.component';

describe('PasswordFormFieldComponent', () => {
  let component: PasswordFormFieldComponent;
  let fixture: ComponentFixture<PasswordFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
