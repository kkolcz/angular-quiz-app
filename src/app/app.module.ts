import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuizAppComponent } from './pages/home/quiz-app/quiz-app.component';
import { StartAppComponent } from './pages/home/start-app/start-app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitQuizAppComponent } from './pages/home/submit-app/submit-quiz-app.component';
import { WelcomeComponent } from './pages/home/welcome-app/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminResultsComponent } from './pages/admin/admin-results/admin-results.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizAppComponent,
    StartAppComponent,
    SubmitQuizAppComponent,
    WelcomeComponent,
    HomeComponent,
    AdminComponent,
    AdminResultsComponent,
    AdminCategoriesComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoadingComponent,
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
