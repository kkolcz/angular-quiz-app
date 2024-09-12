import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminResultsComponent } from './admin-results/admin-results.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoriesComponent,
    AdminResultsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminComponent, AdminCategoriesComponent, AdminResultsComponent],
})
export class AdminModule {}
