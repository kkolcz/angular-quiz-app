import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAppComponent } from './start-app.component';

describe('StartAppComponent', () => {
  let component: StartAppComponent;
  let fixture: ComponentFixture<StartAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartAppComponent]
    });
    fixture = TestBed.createComponent(StartAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
