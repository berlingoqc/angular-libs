import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormRegisterComponent } from './auto-form-register.component';

describe('AutoFormRegisterComponent', () => {
  let component: AutoFormRegisterComponent;
  let fixture: ComponentFixture<AutoFormRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
