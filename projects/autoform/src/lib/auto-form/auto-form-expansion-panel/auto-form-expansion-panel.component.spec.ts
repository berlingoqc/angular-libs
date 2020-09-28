import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFormExpansionPanelComponent } from './auto-form-expansion-panel.component';

describe('AutoFormExpansionPanelComponent', () => {
  let component: AutoFormExpansionPanelComponent;
  let fixture: ComponentFixture<AutoFormExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFormExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFormExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
