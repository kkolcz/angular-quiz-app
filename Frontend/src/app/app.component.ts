import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.autologin();
  }

  autologin(): void {
    const authUser = localStorage.getItem('userAuth');
    this.authService.autoLogin(authUser);
  }
}
