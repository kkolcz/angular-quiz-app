import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

interface IRes {
  message: any;
  username: string;
  quizId: number;
  runningQuizId: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

@Component({
  selector: 'app-admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.scss'],
})
export class AdminResultsComponent {
  results: IRes[] = [];
  isLoading: boolean = true;

  constructor(private quizService: QuizService) {
    this.isLoading = true;
    // this.quizService.getResultsDb().subscribe((res) => {
    //   const result = Object.keys(res).map((key) => [key, res[key]]);
    //   this.results = result;
    //   this.isLoading = false;
    // });

    this.quizService.getAllResults().subscribe({
      next: (res: IRes[]) => {
        this.results = res;
        console.log(this.results[0].runningQuizId);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  deleteHandler(event: string) {
    this.quizService.deleteResult(event);
  }
}
