import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-start-app',
  templateUrl: './start-app.component.html',
  styleUrls: ['./start-app.component.scss'],
})
export class StartAppComponent implements OnInit {
  @Output() quizStartEvent = new EventEmitter<boolean>();
  @Output() setUserNameEvent = new EventEmitter<string>();
  @Output() setCategoryEvent = new EventEmitter<string>();

  categories: any = [];
  isLoading: boolean = true;
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.getCategories().subscribe((res) => {
      for (const [index, value] of Object.entries(res)) {
        // console.log(res);
        this.categories.push({ name: index, value: value });
        // this.categoriesName.push(index);
      }
      this.isLoading = false;
    });
  }

  name = new FormControl('');
  category: string | null = null;

  error: string = '';

  setQuizStart() {
    // console.warn(this.name.value);
    if (this.name.value === '') {
      this.error = 'Nie wprowadzono nazwy użytkownika!';
      return;
    }

    if (this.category === null) {
      this.error = 'Nie wybrano kategorii quizu!';
      return;
    }
    this.setUserNameEvent.emit(<string>this.name.value);
    this.quizStartEvent.emit(true);
  }

  selectCategory(event: any) {
    const selectedCategory: string = event.target.innerText;
    const selectedCategoryId: string = event.target.id;
    console.log(selectedCategoryId);
    this.category = selectedCategory;
    this.setCategoryEvent.emit(selectedCategoryId);
    // console.log(event.target);
  }
}
