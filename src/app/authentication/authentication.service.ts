import { Injectable } from '@angular/core';
import Constants from '../config/constants';
import * as jwt_decode from 'jwt-decode';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
  private mainUrl = `${Constants.host}/user`;


  constructor(
    private http: Http,
    private router: Router
  ) { }

  getToken(): string {
    console.log((this.isTokenValid()));
    return `Bearer ${localStorage.getItem('JWT')}`;
  };

  setToken(token: string) {
    localStorage.setItem('JWT', token);
  };

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if(decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('JWT');
    if(!token) return false;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf()); 
  }

  getUser() {
    const token = this.getToken();
    return jwt_decode(token).user;
  }
  
  logout() {
    localStorage.clear();
    return this.router.navigate(['/authentication/login']);
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.getToken()
      })
    };
  }
}
