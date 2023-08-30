import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizAppComponent } from './quiz-app/quiz-app.component';
import { StartAppComponent } from './start-app/start-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitQuizAppComponent } from './submit-quiz-app/submit-quiz-app.component';

@NgModule({
  declarations: [AppComponent, QuizAppComponent, StartAppComponent, SubmitQuizAppComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
