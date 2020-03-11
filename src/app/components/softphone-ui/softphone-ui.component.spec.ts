import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftphoneUiComponent } from './softphone-ui.component';

describe('SoftphoneUiComponent', () => {
  let component: SoftphoneUiComponent;
  let fixture: ComponentFixture<SoftphoneUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftphoneUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftphoneUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
