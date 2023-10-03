import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
})
export class QuizAppComponent implements OnInit {
  @Output() quizSubmitEvent = new EventEmitter<number>();
  @Input() userName: string = 'unknown';
  @Input() category: string = '';

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
    // const apiUrl = 'http://localhost:3000/questions'
    const apiUrl = `https://quiz-angular-55f08-default-rtdb.firebaseio.com/questions/${this.category}.json`;
    this.http.get(apiUrl).subscribe((res) => {
      this.questionsList = res;
      console.log(this.questionsList);
    });
  }

  nextQuestion() {
    if (this.questionNumber < this.questionsList.length) {
      this.questionNumber++;
    } else {
      this.submitQuiz();
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

  submitQuiz() {
    console.warn(this.userName);
    this.quizSubmitEvent.emit(this.points);
    this.sendResult({
      userName: this.userName,
      points: this.points,
      category: this.category,
    });
  }

  sendResult(data: any) {
    console.warn(data);
    this.http
      .post(
        'https://quiz-angular-55f08-default-rtdb.firebaseio.com/results.json',
        data
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
