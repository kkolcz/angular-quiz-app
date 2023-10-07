import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { Questions } from '../models/questions';
import { Results } from '../models/results';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
})
export class QuizAppComponent implements OnInit {
  @Output() quizSubmitEvent = new EventEmitter<number>();
  @Input() userName: string = 'unknown';
  @Input() category: string = '';

  error: boolean = false;
  isLoading: boolean = false;

  questionsList: Questions[] = [
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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    // const apiUrl = 'http://localhost:3000/questions'
    // this.loading = true;

    this.isLoading = true;
    this.quizService.load(this.category).subscribe((res) => {
      this.questionsList = res as Questions[];
      console.log(res);
      this.isLoading = false;
    });
    // this.loading = false;
    // console.log(this.questionsList);
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

  sendResult(data: Results) {
    this.quizService.sendResultDb(data).subscribe(
      (res) => {
        console.log('Successfully sent data', res, data);
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
}
