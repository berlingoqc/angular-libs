import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormDialogComponent } from './auto-form-dialog.component';

describe('AutoFormDialogComponent', () => {
  let component: AutoFormDialogComponent;
  let fixture: ComponentFixture<AutoFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
