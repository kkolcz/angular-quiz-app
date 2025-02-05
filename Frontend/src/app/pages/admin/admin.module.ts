import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminResultsComponent } from './admin-results/admin-results.component';
import { AdminComponent } from './admin.component';
import { AdminCategoriesEditComponent } from './admin-categories-edit/admin-categories-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeFormatPipe } from 'src/app/pipes/time-format.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoriesComponent,
    AdminResultsComponent,
    AdminCategoriesEditComponent,
    TimeFormatPipe,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
  exports: [AdminComponent, AdminCategoriesComponent, AdminResultsComponent],
})
export class AdminModule {}
