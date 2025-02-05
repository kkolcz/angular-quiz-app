import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/enviroments';
import { tap } from 'rxjs';
import { ICategory } from '../pages/home/home.component';

interface IStopQuizRes {
  message: string;
  quizId: number;
  runningQuizId: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}

interface IRunningQuiz {
  quizId: string;
  runningQuizId: number;
  title: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  runningQuiz: IRunningQuiz = {
    quizId: '0',
    runningQuizId: 0,
    title: '',
    username: '',
  };

  endQuizData: IStopQuizRes;

  API_URL = environment.API_URL;
  TEMP_USER_ID = '1';
  constructor(private http: HttpClient) {}

  startQuiz(category: ICategory, username: string) {
    const runningQuizId = String(category.id);
    console.log('Question loaded', category);
    this.runningQuiz.quizId = runningQuizId;
    const apiUrl = `${this.API_URL}RunningQuiz/startQuiz/${runningQuizId}`;
    return this.http
      .post(apiUrl, { userId: this.TEMP_USER_ID, username: username })
      .pipe(
        tap((res: any) => {
          console.log(res);
          this.runningQuiz = {
            quizId: runningQuizId,
            runningQuizId: res.runningQuizId,
            title: res.quiz.title,
            username: res.username,
          };
        })
      );
  }

  stopQuiz() {
    return this.http
      .post(
        `${this.API_URL}RunningQuiz/stopQuiz/${this.runningQuiz.runningQuizId}`,
        {}
      )
      .pipe(
        tap((res: IStopQuizRes) => {
          this.endQuizData = res;
          console.log(res);
        })
      );
  }

  getRunningQuiz() {
    return this.runningQuiz;
  }

  getEndQuizData() {
    return this.endQuizData;
  }

  sendAnswer(quiz_id: string, question_id: number, answer: string) {
    return this.http.post(`${this.API_URL}RunningQuiz/sendAnswer/${quiz_id}`, {
      questionId: question_id,
      answer: answer,
    });
  }

  sendResultDb(data: any) {
    // console.log('Send result', data);
    return this.http.post(`${this.API_URL}/results.json`, data);
  }

  getResultsDb() {
    console.log('Get result');
    console.log(this.runningQuiz.runningQuizId);
    return this.http.get(
      `${this.API_URL}RunningQuiz/getResults/${this.runningQuiz.runningQuizId}`
    );
  }

  getResultsArray() {
    return this.getResultsDb().subscribe((res) => {
      let results: any = [];
      for (const [index, value] of Object.entries(res)) {
        results.push(value);
      }
      return results;
    });
  }

  getAllResults() {
    return this.http.get(`${this.API_URL}RunningQuiz/getAllResults`);
  }

  getCategories() {
    const res = this.http.get(`${this.API_URL}quiz/getListQuizzes`);
    return res;
  }

  updateCategories(category: string, newData: any) {
    this.http
      .put(`${this.API_URL}/questions/${category}.json`, newData)
      .subscribe((res) => {
        return res;
      });
  }

  deleteCategories(category: number) {
    return this.http.delete(`${this.API_URL}quiz/deleteQuiz/${category}`);
  }

  deleteResult(uid: string) {
    const a = `${this.API_URL}/results/${uid}.json`;
    this.http.delete(a).subscribe((res) => {
      return res;
    });
  }

  getQuizById(id: number) {
    return this.http.get(`${this.API_URL}quiz/getQuiz/${id}`);
  }
}
