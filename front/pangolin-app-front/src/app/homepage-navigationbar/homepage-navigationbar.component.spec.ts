import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageNavigationbarComponent } from './homepage-navigationbar.component';

describe('HomepageNavigationbarComponent', () => {
  let component: HomepageNavigationbarComponent;
  let fixture: ComponentFixture<HomepageNavigationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageNavigationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageNavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
