import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../environments/enviroments';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean {
    if (this.authService.authUser) {
      return true;
    } else {
      return false;
    }
  }

  signIn(login: string, password: string): void {
    this.authService.signIn(login, password).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        alert('Błąd logowania!');
      },
    });
  }

  signUp(login: string, password: string): void {
    if (environment.enable_admin_register) {
      this.authService.signUp(login, password).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          alert('Błąd rejestracji!');
        },
      });
    } else {
      alert('Rejestracja wyłączona!');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
