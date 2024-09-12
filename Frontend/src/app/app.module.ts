import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminResultsComponent } from './pages/admin/admin-results/admin-results.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeModule } from './pages/home/home.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoadingComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
