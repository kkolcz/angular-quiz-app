import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StartComponent } from './pages/start/start.component';
import { AdminResultsComponent } from './pages/admin-results/admin-results.component';
// import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'quiz', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'admin',
    component: AdminResultsComponent,
    children: [{ path: 'results', component: AdminResultsComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
