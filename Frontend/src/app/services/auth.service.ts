import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from '../environments/enviroments';
import { tap } from 'rxjs';

interface IUser {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  API_URL = environment.API_URL;
  authUser: IUser = null;

  constructor(private http: HttpClient, public router: Router) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }
    // });
  }

  autoLogin(userAuth) {
    this.authUser = userAuth;
  }

  signIn(username: string, password: string) {
    return this.http
      .post(`${this.API_URL}account/login`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((res: any) => {
          this.authUser = {
            username: res.username,
            token: res.token,
          };
          localStorage.setItem('userAuth', JSON.stringify(this.authUser));
          // this.router.navigate(['admin', 'results']);
        })
      );

    // return this.afAuth
    //   .signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     this.afAuth.authState.subscribe((user) => {
    //       if (user) {
    //         window.alert('Zalogowano pomyślnie!');
    //         this.router.navigate(['admin', 'results']);
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     window.alert(error.message);
    //   });
  }

  signUp(username: string, password: string) {
    return this.http
      .post(`${this.API_URL}account/register`, {
        username: username,
        password: password,
      })
      .pipe(
        tap((res: any) => {
          this.authUser = {
            username: res.username,
            token: res.token,
          };
          localStorage.setItem('userAuth', JSON.stringify(this.authUser));
          // this.router.navigate(['admin', 'results']);
        })
      );

    // return this.afAuth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     window.alert('Zarejestrowano pomyślnie!');
    //   })
    //   .catch((error) => {
    //     window.alert(error.message);
    //   });
  }

  logout() {
    localStorage.removeItem('userAuth');
    location.reload();
    // return this.afAuth.signOut().then(() => {
    //   this.router.navigate(['admin']);
    // });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
}
