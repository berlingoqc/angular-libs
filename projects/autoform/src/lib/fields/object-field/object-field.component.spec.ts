import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFieldComponent } from './object-field.component';

describe('ObjectFieldComponent', () => {
  let component: ObjectFieldComponent;
  let fixture: ComponentFixture<ObjectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
