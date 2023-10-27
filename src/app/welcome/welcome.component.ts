import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @Output() closeWelcomeEvent = new EventEmitter<boolean>();

  closeWelcome() {
    this.closeWelcomeEvent.emit();
  }
}
