import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunningQuizAppComponent } from './running-quiz-app/running-quiz-app.component';
import { SelectCategoryAppComponent } from './select-category-app/select-category-app.component';
import { SubmitQuizAppComponent } from './submit-app/submit-quiz-app.component';
import { WelcomeComponent } from './welcome-app/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    RunningQuizAppComponent,
    SelectCategoryAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
  ],
  imports: [HomeRoutingModule, CommonModule, ReactiveFormsModule],
  exports: [
    RunningQuizAppComponent,
    SelectCategoryAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
  ],
})
export class HomeModule {}
