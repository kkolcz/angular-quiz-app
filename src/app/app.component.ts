import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-quiz-app';
  quizStarted = false;
  quizEnd = false;
  points: number = 0;

  startQuiz(val: boolean) {
    this.quizStarted = val;
  }

  submitQuiz(points: number) {
    this.points = points;
    this.quizEnd = true;
  }
}
