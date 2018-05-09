import { Injectable } from '@angular/core';
import Constants from '../../../config/constants';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  private mainUrl = `${Constants.host}/user`;
  private registrationUrl = `${this.mainUrl}/create`;
  private validationUrl = `${this.mainUrl}/validateEmail`;
  private authenticationUrl = `${this.mainUrl}/authenticate`;


  constructor(private http: Http) { }

  registerUser(user) {
    return this.http.post(this.registrationUrl, { user }).map(this.extractData).catch(this.handleError);
  }

  loginUser(user) {
    return this.http.post(this.authenticationUrl, { user }).map(this.extractData).catch(this.handleError);
  }

  validateEmail(email: string) {
    return this.http.post(this.validationUrl, { email }).map(this.extractData).catch(this.handleError);
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

