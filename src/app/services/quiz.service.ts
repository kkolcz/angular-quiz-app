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
}
