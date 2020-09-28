import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormCardComponent } from './auto-form-card.component';

describe('AutoFormCardComponent', () => {
  let component: AutoFormCardComponent;
  let fixture: ComponentFixture<AutoFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
