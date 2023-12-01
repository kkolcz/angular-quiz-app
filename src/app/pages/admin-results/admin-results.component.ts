import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-admin-results',
  templateUrl: './admin-results.component.html',
  styleUrls: ['./admin-results.component.scss'],
})
export class AdminResultsComponent {
  results: any = [];

  constructor(private quizService: QuizService) {
    this.quizService.getResultsDb().subscribe((res) => {
      const mapped = Object.values(res);
      this.results = mapped;
    });
  }
}
