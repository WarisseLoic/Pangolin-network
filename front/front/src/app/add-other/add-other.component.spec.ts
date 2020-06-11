import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherComponent } from './add-other.component';

describe('AddOtherComponent', () => {
  let component: AddOtherComponent;
  let fixture: ComponentFixture<AddOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
