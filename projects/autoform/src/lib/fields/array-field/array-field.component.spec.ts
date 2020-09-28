import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayFieldComponent } from './array-field.component';

describe('ArrayFieldComponent', () => {
  let component: ArrayFieldComponent;
  let fixture: ComponentFixture<ArrayFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
