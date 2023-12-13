import { Injectable } from '@angular/core';

interface loginData {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signIn(data: loginData) {
    console.log(data);
  }
}
