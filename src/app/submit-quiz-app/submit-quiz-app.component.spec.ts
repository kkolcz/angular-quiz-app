import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuizAppComponent } from './submit-quiz-app.component';

describe('SubmitQuizAppComponent', () => {
  let component: SubmitQuizAppComponent;
  let fixture: ComponentFixture<SubmitQuizAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitQuizAppComponent]
    });
    fixture = TestBed.createComponent(SubmitQuizAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
