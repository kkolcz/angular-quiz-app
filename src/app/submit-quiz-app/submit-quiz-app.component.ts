import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-quiz-app',
  templateUrl: './submit-quiz-app.component.html',
  styleUrls: ['./submit-quiz-app.component.scss'],
})
export class SubmitQuizAppComponent {
  @Output() restartQuizEvent = new EventEmitter<string>();
  // points: number = 0;
  notification: string = '';

  @Input() points: number = 0;
  @Input() userName: string = 'unknown';

  restartQuiz() {
    // console.log('restart');
    this.restartQuizEvent.emit();
  }
}
