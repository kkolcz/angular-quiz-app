import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
interface IStopQuizRes {
  message: string;
  quizId: number;
  runningQuizId: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}
@Component({
  selector: 'app-submit-quiz-app',
  templateUrl: './submit-quiz-app.component.html',
  styleUrls: ['./submit-quiz-app.component.scss'],
})
export class SubmitQuizAppComponent {
  @Output() restartQuizEvent = new EventEmitter<string>();
  notification: string = '';

  // @Input() endQuizData: IStopQuizRes;
  @Input() username: string = 'unknown';

  endQuizData: IStopQuizRes;

  constructor(quizService: QuizService) {
    this.endQuizData = quizService.getEndQuizData();
  }

  restartQuiz() {
    this.restartQuizEvent.emit();
  }
}
