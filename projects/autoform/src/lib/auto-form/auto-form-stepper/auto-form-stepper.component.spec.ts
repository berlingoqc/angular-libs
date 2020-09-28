import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormStepperComponent } from './auto-form-stepper.component';

describe('AutoFormStepperComponent', () => {
  let component: AutoFormStepperComponent;
  let fixture: ComponentFixture<AutoFormStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
