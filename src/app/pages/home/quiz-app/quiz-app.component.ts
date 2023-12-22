import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.sendStartQuiz(this.username, this.category);

    const interval = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        clearInterval(interval);
        this.submitQuiz();
      }
    }, 1000);

    this.results = this.quizService.getResultsArray();
    console.log(this.results);
  }

  loadQuestions() {
    this.isLoading = true;
    this.quizService.load(this.category).subscribe((res) => {
      this.questionsList = res as Questions[];
      this.time = this.questionsList.length * this.timeForQuestion;
      console.log(res);
      this.isLoading = false;
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
    if (this.quizIsEnded === false) {
      console.log(this.questionNumber);
      console.warn(this.username);
      const totalQuizTime = this.questionNumber * this.timeForQuestion;
      const solvedIn = totalQuizTime - this.time;
      this.quizIsEnded = true;
      this.quizSubmitEvent.emit(this.points);

      // SUBMIT QUIZ
      this.sendResult({
        username: this.username,
        points: this.points,
        maxPoints: this.questionsList.length,
        category: this.category,
        solvedInSeconds: solvedIn,
        totalQuizTime: totalQuizTime,
        datetime: new Date().toLocaleString('pl-PL').toString(),
      });
    }
  }

  sendResult(data: Results) {
    this.quizService.sendResultDb(data).subscribe(
      (res) => {},
      (err) => {
        console.error('Error', err);
      }
    );
  }

  // SEND START QUIZ
  sendStartQuiz(username: string, category: string) {
    this.sendResult({
      username: username,
      points: 0,
      maxPoints: 0,
      category: `${category}(started)`,
      solvedInSeconds: 0,
      totalQuizTime: 0,
      datetime: new Date().toLocaleString('pl-PL').toString(),
    });
  }
}
