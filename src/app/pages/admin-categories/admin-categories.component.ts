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
  editCategory: any = '';
  categoriesName: string = '';
  isAddingNew = false;

  name = new FormControl('');
  question = new FormControl('');
  answer1 = new FormControl('');
  answer2 = new FormControl('');
  answer3 = new FormControl('');
  answer4 = new FormControl('');
  radio1 = new FormControl(true);
  radio2 = new FormControl(false);
  radio3 = new FormControl(false);
  radio4 = new FormControl(false);
  questionNr = 0;
  correctAnswer = 1;

  isEditing = false;
  questions: any = [];

  ngOnInit(): void {
    this.quizService.getCategories().subscribe((res) => {
      for (const [index, value] of Object.entries(res)) {
        // console.log(res);
        this.categories.push({ name: index, value: value });
        // this.categoriesName.push(index);
      }
      // console.log(this.categories);
    });

    // this.quizService.getCategories().subscribe((res) => {
    // const mapped = Object.values(res);
    // this.categories.push(mapped);
    // this.categories = mapped;
    // console.log(this.categories);

    // for (const [key, value] of Object.entries(res)) {
    //   console.log(`${key}: ${value}`);
    // }
    // });
  }

  editQuestion(e: any): void {
    // console.log(e);
    this.questions = Object.values(e.value);
    this.categoriesName = e.name;
    this.isEditing = true;
    this.questionNr = 0;
    this.loadQuestion();
    // console.log(this.questions[0]);
  }

  loadQuestion() {
    // this.question = ;

    this.name.setValue(this.categoriesName);
    this.question.setValue(this.questions[this.questionNr].question);
    this.answer1.setValue(this.questions[this.questionNr].options[0].answer);
    this.answer2.setValue(this.questions[this.questionNr].options[1].answer);
    this.answer3.setValue(this.questions[this.questionNr].options[2].answer);
    this.answer4.setValue(this.questions[this.questionNr].options[3].answer);

    if (this.questions[this.questionNr].options[0].isCorrect === true)
      this.correctAnswer = 1;
    if (this.questions[this.questionNr].options[1].isCorrect === true)
      this.correctAnswer = 2;
    if (this.questions[this.questionNr].options[2].isCorrect === true)
      this.correctAnswer = 3;
    if (this.questions[this.questionNr].options[3].isCorrect === true)
      this.correctAnswer = 4;

    // console.log(this.question.value);
    // console.log(this.questions[this.questionNr]);
  }

  finishHandler(): void {
    console.log(this.questions);
    this.quizService.updateCategories(this.categoriesName, this.questions);
  }

  nextQuestionHandler(): void {
    if (this.questionNr + 1 < this.questions.length) {
      this.questionNr++;
    }

    if (this.isAddingNew) {
    }
    // console.log(this.questions);

    // console.log(this.questionNr);
    // console.log(this.questions.length);
    // this.saveQuestion();
    this.loadQuestion();
  }

  prevQuestionHandler(): void {
    if (this.questionNr > 0) {
      this.questionNr--;
    }
    // console.log(this.questionNr);
    // console.log(this.questions.length);
    // this.saveQuestion();
    this.loadQuestion();
  }

  saveQuestion(): void {
    console.log(this.questions);
    console.log(this.radio1.enabled);
    this.categoriesName = this.name.value as string;
    this.questions[this.questionNr] = {
      options: [
        {
          answer: this.answer1.value,
          isCorrect: this.correctAnswer === 1,
        },
        {
          answer: this.answer2.value,
          isCorrect: this.correctAnswer === 2,
        },
        {
          answer: this.answer3.value,
          isCorrect: this.correctAnswer === 3,
        },
        {
          answer: this.answer4.value,
          isCorrect: this.correctAnswer === 4,
        },
      ],
      question: this.question.value,
      questionId: this.questionNr + 1,
    };
    // this.questions
    // this.question
    // this.answer1
  }

  addNewQuiz(): void {
    this.isAddingNew = true;
    this.categoriesName = 'Nowy Quiz';
    this.questionNr = 0;
    this.addNewQuestionHandler();
    console.log(this.questions);
    this.loadQuestion();
  }

  addNewQuestionHandler(): void {
    const QUESTION_DEFAULT = {
      options: [
        {
          answer: '',
          isCorrect: false,
        },
        {
          answer: '',
          isCorrect: false,
        },
        {
          answer: '',
          isCorrect: true,
        },
        {
          answer: '',
          isCorrect: false,
        },
      ],
      question: 'Pytanie?',
      questionId: this.questions.length,
    };

    this.questions.push(QUESTION_DEFAULT);
  }

  deleteCategory(e: any) {
    console.log(e.name);
    this.quizService.deleteCategories(e.name);
  }
}
