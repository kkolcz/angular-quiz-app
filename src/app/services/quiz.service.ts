import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  load(category: string) {
    const apiUrl = `https://quiz-angular-55f08-default-rtdb.firebaseio.com/questions/${category}.json`;

    return this.http.get(apiUrl);
  }

  sendResultDb(data: any) {
    return this.http.post(
      'https://quiz-angular-55f08-default-rtdb.firebaseio.com/results.json',
      data
    );
  }

  getResultsDb() {
    return this.http.get(
      'https://quiz-angular-55f08-default-rtdb.firebaseio.com/results.json'
    );
  }

  getResultsArray() {
    let results: any = [];
    this.getResultsDb().subscribe((res) => {
      for (const [index, value] of Object.entries(res)) {
        results.push(value);
      }
    });

    return results;
  }
}
