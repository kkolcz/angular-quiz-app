import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  load(category: string) {
    const apiUrl = `${this.API_URL}/questions/${category}.json`;

    return this.http.get(apiUrl);
  }

  sendResultDb(data: any) {
    return this.http.post(`${this.API_URL}/results.json`, data);
  }

  getResultsDb() {
    return this.http.get(`${this.API_URL}/results.json`);
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
    const res = this.http.get(`${this.API_URL}/questions.json`);
    return res;
  }

  updateCategories(category: string, newData: any) {
    this.http
      .put(`${this.API_URL}/questions/${category}.json`, newData)
      .subscribe((res) => {
        return res;
      });
  }

  deleteCategories(category: string) {
    const a = `${this.API_URL}/questions/${category}.json`;
    this.http.delete(a).subscribe((res) => {
      return res;
    });
  }

  deleteResult(uid: string) {
    const a = `${this.API_URL}/results/${uid}.json`;
    this.http.delete(a).subscribe((res) => {
      return res;
    });
  }
}
