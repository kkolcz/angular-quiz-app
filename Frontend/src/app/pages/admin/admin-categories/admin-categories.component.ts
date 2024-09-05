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

  isLoading: boolean = true;

  categories: any = [];
  editCategory: any = '';
  currEditedCategory: string = '';

  name = new FormControl('');
  time = new FormControl();
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

  questions: any = [];

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.getCategories().subscribe((res) => {
      for (const [index, value] of Object.entries(res)) {
        this.categories.push({ name: index, value: value });
      }
      this.isLoading = false;
    });
  }

  editQuestion(e: any): void {
    this.questions = Object.values(e.value);
    this.currEditedCategory = e.name;
    this.questionNr = 0;
    this.loadQuestion();
  }

  loadQuestion() {
    this.name.setValue(this.currEditedCategory);
    this.time.setValue(this.questions[0].time);
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
  }

  cleanQuestions() {
    this.name.setValue('');
    this.time.setValue(60);
    this.question.setValue('');
    this.answer1.setValue('');
    this.answer2.setValue('');
    this.answer3.setValue('');
    this.answer4.setValue('');
    this.questionNr = 0;
  }

  // ZAKOŃCZENIE EDYCJI KATEGORII I WYSŁANIE DO BAZY DANYCH
  finishQuizHandler(): void {
    this.saveQuestionHandler();
    this.quizService.updateCategories(this.currEditedCategory, this.questions);
    this.currEditedCategory = '';
  }

  // PORUSZANIE SIĘ PO PYTANIACH
  // NASTĘPNE PYTANIE
  nextQuestionHandler(): void {
    this.saveQuestionHandler();

    if (this.questionNr + 1 < this.questions.length) {
      this.questionNr++;
    }

    this.loadQuestion();
  }

  // POPRZEDNIE PYTANIE
  prevQuestionHandler(): void {
    this.saveQuestionHandler();

    if (this.questionNr > 0) {
      this.questionNr--;
    }
    this.loadQuestion();
  }

  // ZAPISANIE PYTANIA DO ZMIENNEJ
  saveQuestionHandler(): void {
    this.currEditedCategory = this.name.value as string;
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
      time: this.time.value,
      questionId: this.questionNr + 1,
    };
  }

  // UTWORZENIE NOWEGO QUIZU
  createNewQuizHandler(): void {
    this.cleanQuestions();
    this.currEditedCategory = 'Nowy Quiz';
    this.name.setValue('Nowy Quiz');
    this.time.setValue(60);
    this.questionNr = 0;
    this.questions = [];
  }

  // DODANIE NOWEGO PYTANIA
  addNewQuestionHandler(): void {
    this.saveQuestionHandler();
    const QUESTION_DEFAULT = {
      options: [
        {
          answer: '',
          isCorrect: true,
        },
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
          isCorrect: false,
        },
      ],
      question: '',
      questionId: this.questions.length,
    };

    this.questions.push(QUESTION_DEFAULT);
    this.questionNr = this.questions.length - 1;
    this.loadQuestion();
  }

  deleteQuestion() {
    const index = 1;
    const A = this.questions.slice(0, index);
    const B = this.questions.slice(index + 1);
    const C = A.concat(B);

    const newQuestionsList = this.questions.slice(2, 4);
  }

  deleteCategory(e: any) {
    this.quizService.deleteCategories(e.name);
  }
}
