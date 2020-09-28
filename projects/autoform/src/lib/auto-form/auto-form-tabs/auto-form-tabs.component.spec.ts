import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormTabsComponent } from './auto-form-tabs.component';

describe('AutoFormTabsComponent', () => {
  let component: AutoFormTabsComponent;
  let fixture: ComponentFixture<AutoFormTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
