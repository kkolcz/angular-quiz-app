import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IQuiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-admin-categories-edit',
  templateUrl: './admin-categories-edit.component.html',
  styleUrls: ['./admin-categories-edit.component.scss'],
})
export class AdminCategoriesEditComponent implements OnInit {
  quizForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = parseInt(params.get('id'));
      this.loadQuiz();
    });

    this.quizForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  loadQuiz(): void {
    // Załaduj quiz z serwera i zainicjalizuj formularz
    this.quizService.getQuizById(this.categoryId).subscribe((quiz: IQuiz) => {
      quiz.questions.forEach((question) => {
        this.questions.push(
          this.fb.group({
            title: [question.title, Validators.required],
            option1: [question.option1, Validators.required],
            option2: [question.option2, Validators.required],
            option3: [question.option3, Validators.required],
            option4: [question.option4, Validators.required],
            correctAnswer: [question.correctAnswer, Validators.required],
          })
        );
      });
    });
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      console.log(this.quizForm.value);
      // Wyślij dane formularza do serwera
    }
  }
}
