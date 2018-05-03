import { Injectable } from '@angular/core';
import Constants from '../config/constants';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private mainUrl = `${Constants.host}/user`;
  private registrationUrl = `${this.mainUrl}/create`;


  constructor(private http: Http) { }

  registerUser(fullName: string, email: string, county: string, password: string) {
    return this.http.post(this.registrationUrl, { fullName,  email, county, passwordCandidate: password }).map(this.extractData).catch(this.handleError);
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
