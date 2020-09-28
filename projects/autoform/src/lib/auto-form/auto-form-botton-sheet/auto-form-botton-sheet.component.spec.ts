import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormBottonSheetComponent } from './auto-form-botton-sheet.component';

describe('AutoFormBottonSheetComponent', () => {
  let component: AutoFormBottonSheetComponent;
  let fixture: ComponentFixture<AutoFormBottonSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormBottonSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormBottonSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
