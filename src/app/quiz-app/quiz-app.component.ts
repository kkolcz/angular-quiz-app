import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
})
export class QuizAppComponent implements OnInit {
  questionsList: any = [{}];
  questionNumber: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get('http://localhost:3000/questions').subscribe((res) => {
      this.questionsList = res;
      console.log(this.questionsList);
    });
  }

  nextQuestion() {
    if (this.questionNumber < this.questionsList.length) {
      this.questionNumber++;
    }
  }

  prevQuestion() {
    if (this.questionNumber > 1) {
      this.questionNumber--;
    }
  }
}
