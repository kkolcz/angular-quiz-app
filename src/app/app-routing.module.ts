import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StartComponent } from './pages/start/start.component';
import { AdminResultsComponent } from './pages/admin-results/admin-results.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full',
  },
  { path: 'quiz', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/categories', component: AdminCategoriesComponent },
  { path: 'admin/results', component: AdminResultsComponent },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   pathMatch: 'full',
  //   children: [
  //     { path: 'categories', component: AdminCategoriesComponent },
  //     { path: 'results', component: AdminResultsComponent },
  //   ],
  // },
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
