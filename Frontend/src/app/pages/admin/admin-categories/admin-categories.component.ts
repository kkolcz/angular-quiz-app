import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';
import { ICategory } from '../../home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  constructor(private quizService: QuizService, private router: Router) {}

  isLoading: boolean = true;

  categories: ICategory[] = [];
  editCategory: any = '';
  currEditedCategory: string = '';

  questions: any = [];

  ngOnInit(): void {
    this.isLoading = true;

    this.quizService.getCategories().subscribe({
      next: (res: ICategory[]) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading = false;
        console.log(this.categories);
      },
    });
  }

  editQuestion(category: ICategory) {
    this.router.navigate(['admin/edit', category.id]);
  }

  deleteCategory(category: ICategory) {
    this.quizService.deleteCategories(category.id).subscribe({
      next: (_) => {},
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.categories = this.categories.filter((c) => c.id !== category.id);
      },
    });
  }
}
