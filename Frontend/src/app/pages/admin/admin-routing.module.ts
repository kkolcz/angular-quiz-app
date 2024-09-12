import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminResultsComponent } from './admin-results/admin-results.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'categories', component: AdminCategoriesComponent },
  { path: 'results', component: AdminResultsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
