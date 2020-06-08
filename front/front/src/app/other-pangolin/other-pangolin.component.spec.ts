import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPangolinComponent } from './other-pangolin.component';

describe('OtherPangolinComponent', () => {
  let component: OtherPangolinComponent;
  let fixture: ComponentFixture<OtherPangolinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPangolinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
