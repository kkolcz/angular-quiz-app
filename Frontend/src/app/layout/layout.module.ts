import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent, FooterComponent],
  imports: [CommonModule],
  exports: [LayoutComponent, FooterComponent],
})
export class LayoutModule {}
