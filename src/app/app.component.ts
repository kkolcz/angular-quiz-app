import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-quiz-app';
  userName: string = 'unknown';

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

  setUserName(userName: string) {
    this.userName = userName;
  }
}
