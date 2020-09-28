import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormComponent } from './auto-form.component';

describe('AutoFormComponent', () => {
  let component: AutoFormComponent;
  let fixture: ComponentFixture<AutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
