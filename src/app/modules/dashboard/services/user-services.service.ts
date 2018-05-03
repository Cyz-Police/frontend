import { Injectable } from '@angular/core';
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
export class UserServicesService {
  private mainUrl = `${Constants.host}/user`;

  private getAllUrl = `${this.mainUrl}/getAll`;
  private roleChangeUrl = `${this.mainUrl}/changeRole`;
  private deactivationUrl = `${this.mainUrl}/deactivate`;
  private activationUrl = `${this.mainUrl}/activate`;

  constructor(private http: Http) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get(this.getAllUrl).map(this.extractData).catch(this.handleError);
  }

  deactivateUser(userId: String) {
    return this.http.post(this.deactivationUrl, { userId }).map(this.extractData).catch(this.handleError);
  }

  activateUser(userId: String) {
    return this.http.post(this.activationUrl, { userId }).map(this.extractData).catch(this.handleError);
  }

  changeUsersRole(userId: String, role: String) {
    return this.http.post(this.roleChangeUrl, { userId, role }).map(this.extractData).catch(this.handleError);
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
