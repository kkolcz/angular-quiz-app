import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuizAppComponent } from './quiz-app/quiz-app.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizAppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
