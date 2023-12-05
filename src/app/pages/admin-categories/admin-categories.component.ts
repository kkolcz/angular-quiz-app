import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  categories: any = [];
  editCategory = '';
  name = new FormControl('');
  question = new FormControl('aa');
  answer1 = new FormControl('');
  answer2 = new FormControl('');
  answer3 = new FormControl('');
  answer4 = new FormControl('');
  questionNr = 0;

  isEditing = false;
  questions: any = [];

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((res) => {
      const mapped = Object.values(res);
      // this.categories.push(mapped);
      this.categories = mapped;
      // console.log(this.categories);

      // for (const [key, value] of Object.entries(res)) {
      //   console.log(`${key}: ${value}`);
      // }
    });
  }

  editQuestion(e: any): void {
    this.questions = Object.values(e);
    this.isEditing = true;
    this.questionNr = 0;
    this.loadQuestion();
    // console.log(this.questions[0]);
  }

  loadQuestion() {
    // this.question = ;
    this.question.setValue(this.questions[this.questionNr].question);
    this.answer1.setValue(this.questions[this.questionNr].options[0].answer);
    this.answer2.setValue(this.questions[this.questionNr].options[1].answer);
    this.answer3.setValue(this.questions[this.questionNr].options[2].answer);
    this.answer4.setValue(this.questions[this.questionNr].options[3].answer);

    console.log(this.question.value);
    // console.log(this.questions[this.questionNr]);
  }

  addNewCategoryHandler(): void {
    console.log(this.question.value);
    console.log(this.answer1.value);
    console.log(this.answer2.value);
    console.log(this.answer3.value);
    console.log(this.answer4.value);
  }

  finishHandler(): void {}

  nextQuestionHandler(): void {
    if (this.questionNr + 1 < this.questions.length - 1) {
      this.questionNr++;
    }

    console.log(this.questionNr);
    console.log(this.questions.length);
    this.loadQuestion();
  }

  prevQuestionHandler(): void {
    if (this.questionNr > 0) {
      this.questionNr--;
    }
    console.log(this.questionNr);
    console.log(this.questions.length);
    this.loadQuestion();
  }
}
