import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: string;

  constructor() { }

  isAuthenticated() {
    if(this.auth) {
      return this.auth;
    }
    this.auth = localStorage.getItem('token');
    return (this.auth) ? this.auth : null;
  }
}
