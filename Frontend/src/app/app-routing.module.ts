import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/home/welcome-app/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminResultsComponent } from './pages/admin/admin-results/admin-results.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guard/auth.guard';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  // { path: 'login', component: LoginComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes, { enableTracing: false }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
