import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictFieldComponent } from './dict-field.component';

describe('DictFieldComponent', () => {
  let component: DictFieldComponent;
  let fixture: ComponentFixture<DictFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
