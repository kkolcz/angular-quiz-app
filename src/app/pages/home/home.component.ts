import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'angular-quiz-app';
  username: string = 'unknown';
  category: string = '';

  quizStarted = false;
  quizEnd = false;
  points: number = 0;

  showWelcome: boolean = true;

  closeWelcome() {
    this.showWelcome = false;
  }

  startQuiz(val: boolean) {
    this.quizStarted = val;
  }

  submitQuiz(points: number) {
    this.points = points;
    this.quizEnd = true;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCategory(category: string) {
    this.category = category;
  }

  restartQuiz() {
    this.quizStarted = false;
    this.quizEnd = false;
    this.points = 0;
    // console.log('restarttttt');
  }
}
