import { Injectable, enableProdMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../interfaces/user';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import Constants from '../../../config/constants';

@Injectable()
export class UserService {
  private mainUrl = `${Constants.host}/user`;

  private validationUrl = `${this.mainUrl}/validateEmail`;
  private registrationUrl = `${this.mainUrl}/create`;

  constructor(private http: Http) { }

  validateUserEmail(email: string) {
    return this.http.post(this.validationUrl, { email }).map(this.extractData).catch(this.handleError);
  }
  
  registrateUser(user: User) {
    const { email, fullName, county, password } = user; 
    return this.http.post(this.registrationUrl, { email, fullName, county, passwordCandidate: password }).map(this.extractData).catch(this.handleError);
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
