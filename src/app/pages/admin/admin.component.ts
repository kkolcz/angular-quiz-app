import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    return this.authService.isLoggedIn;
  }

  categories(): void {
    this.router.navigate(['categories'], { relativeTo: this.route });
  }

  signIn(login: string, password: string): void {
    this.authService.signIn(login, password);
  }

  signUp(login: string, password: string): void {
    alert('Rejestracja wyłączona!');
    // this.authService.signUp(login, password);
  }

  logout(): void {
    this.authService.logout();
  }
}
