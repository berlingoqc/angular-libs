import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoolFieldComponent } from './bool-field.component';

describe('BoolFieldComponent', () => {
  let component: BoolFieldComponent;
  let fixture: ComponentFixture<BoolFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoolFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoolFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
