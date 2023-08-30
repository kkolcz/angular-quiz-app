import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-start-app',
  templateUrl: './start-app.component.html',
  styleUrls: ['./start-app.component.scss'],
})
export class StartAppComponent {
  @Output() quizStartEvent = new EventEmitter<boolean>();
  @Output() setUserNameEvent = new EventEmitter<string>();

  name = new FormControl('');

  setQuizStart() {
    this.setUserNameEvent.emit(<string>this.name.value);
    this.quizStartEvent.emit(true);
  }
}
