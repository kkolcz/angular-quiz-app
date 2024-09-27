import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LayoutQuizComponent } from './layout-quiz/layout-quiz.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';

@NgModule({
  declarations: [LayoutPageComponent, LayoutQuizComponent, FooterComponent],
  imports: [CommonModule],
  exports: [LayoutPageComponent, LayoutQuizComponent, FooterComponent],
})
export class LayoutModule {}
