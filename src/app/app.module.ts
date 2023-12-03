import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizAppComponent } from './quiz-app/quiz-app.component';
import { StartAppComponent } from './start-app/start-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitQuizAppComponent } from './submit-quiz-app/submit-quiz-app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StartComponent } from './pages/start/start.component';
import { AdminResultsComponent } from './pages/admin-results/admin-results.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizAppComponent,
    StartAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
    HomeComponent,
    AdminComponent,
    StartComponent,
    AdminResultsComponent,
    AdminCategoriesComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
