import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobFieldComponent } from './blob-field.component';

describe('BlobFieldComponent', () => {
  let component: BlobFieldComponent;
  let fixture: ComponentFixture<BlobFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
