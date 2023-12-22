import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_KEY = 'https://quiz-angular-55f08-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  load(category: string) {
    const apiUrl = `${this.API_KEY}/questions/${category}.json`;

    return this.http.get(apiUrl);
  }

  sendResultDb(data: any) {
    return this.http.post(`${this.API_KEY}/results.json`, data);
  }

  getResultsDb() {
    return this.http.get(`${this.API_KEY}/results.json`);
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

  getCategories() {
    const res = this.http.get(`${this.API_KEY}/questions.json`);
    return res;
  }

  updateCategories(category: string, newData: any) {
    console.log(category);
    this.http
      .put(`${this.API_KEY}/questions/${category}.json`, newData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteCategories(category: string) {
    const a = `${this.API_KEY}/questions/${category}.json`;
    console.log(a);
    this.http.delete(a).subscribe((res) => {
      console.log(res);
    });
  }

  deleteResult(uid: string) {
    const a = `${this.API_KEY}/results/${uid}.json`;
    console.log(a);
    this.http.delete(a).subscribe((res) => {
      console.log(res);
    });
  }
}
