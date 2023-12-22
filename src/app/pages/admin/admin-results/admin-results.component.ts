import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.scss'],
})
export class AdminResultsComponent {
  results: any = [];
  isLoading: boolean = true;

  constructor(private quizService: QuizService) {
    this.isLoading = true;
    // this.quizService.getCategories();
    this.quizService.getResultsDb().subscribe((res) => {
      // console.log(res);
      // const mapped = Object.values(res);
      const result = Object.keys(res).map((key) => [key, res[key]]);
      // console.log(Object.values(res));
      // console.log(Object.keys(res));
      this.results = result;
      this.isLoading = false;
    });
  }

  deleteHandler(event: string) {
    // console.log('Delete: ', event);
    this.quizService.deleteResult(event);
  }
}
