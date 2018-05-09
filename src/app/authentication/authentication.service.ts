import { Injectable } from '@angular/core';
import Constants from '../config/constants';
import * as jwt_decode from 'jwt-decode';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
  private mainUrl = `${Constants.host}/user`;


  constructor(private http: Http) { }

  getToken(): string {
    return localStorage.getItem('JWT');
  }

  setToken(token: string) {
    localStorage.setItem('JWT', token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if(decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
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
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  };
}
