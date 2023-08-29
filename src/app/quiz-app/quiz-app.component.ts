import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
})
export class QuizAppComponent implements OnInit {
  questionsList: any = [
    {
      questionId: -1,
      question: '',
      options: [
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
        { answer: '', isCorrect: false },
      ],
    },
  ];
  questionNumber: number = 1;
  selectedAnswer: number = -1;
  points: number = 0;

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

  selectAnswer(answer: any) {
    this.selectedAnswer = answer;
    const answerIs =
      this.questionsList[this.questionNumber - 1].options[answer].isCorrect;

    console.log(answerIs);
    if (answerIs) {
      this.points++;
    }

    this.nextQuestion();
  }
}
