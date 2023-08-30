import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-quiz-app',
  templateUrl: './submit-quiz-app.component.html',
  styleUrls: ['./submit-quiz-app.component.scss'],
})
export class SubmitQuizAppComponent {
  // points: number = 0;

  @Input() points: number = 0;
}