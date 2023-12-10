import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { QuizService } from '../../../services/quiz.service';
import { Questions } from '../../../models/questions';
import { Results } from '../../../models/results';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
})
export class QuizAppComponent implements OnInit {
  @Output() quizSubmitEvent = new EventEmitter<number>();
  @Input() username: string = 'unknown';
  @Input() category: string = '';

  error: boolean = false;
  isLoading: boolean = false;
  quizIsEnded: boolean = false;

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
  results: any = null;
  timeForQuestion = 60;
  time: number = 60;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuestions();

    const interval = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        clearInterval(interval);
        this.submitQuiz();
      }
    }, 1000);

    // this.quizService.getResultsDb().subscribe((res) => {
    //   let results = [];
    //   console.log(res);
    //   for (const [index, value] of Object.entries(res)) {
    //     results.push(value);
    //   }
    //   // console.log(results);
    //   return results;
    // });

    this.results = this.quizService.getResultsArray();
    console.log(this.results);
  }

  loadQuestions() {
    // const apiUrl = 'http://localhost:3000/questions'
    // this.loading = true;

    this.isLoading = true;
    this.quizService.load(this.category).subscribe((res) => {
      this.questionsList = res as Questions[];
      this.time = this.questionsList.length * this.timeForQuestion;
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
      // this.time = 0;
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
    if (this.quizIsEnded === false) {
      console.log(this.questionNumber);
      console.warn(this.username);
      const totalQuizTime = this.questionNumber * this.timeForQuestion;
      const solvedIn = totalQuizTime - this.time;
      this.quizIsEnded = true;
      this.quizSubmitEvent.emit(this.points);
      this.sendResult({
        username: this.username,
        points: this.points,
        category: this.category,
        solvedInSeconds: solvedIn,
        totalQuizTime: totalQuizTime,
      });
    }
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
