import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizAppComponent } from './quiz-app/quiz-app.component';
import { StartAppComponent } from './start-app/start-app.component';
import { SubmitQuizAppComponent } from './submit-app/submit-quiz-app.component';
import { WelcomeComponent } from './welcome-app/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    QuizAppComponent,
    StartAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
  ],
  imports: [HomeRoutingModule, CommonModule, ReactiveFormsModule],
  exports: [
    QuizAppComponent,
    StartAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
  ],
})
export class HomeModule {}
