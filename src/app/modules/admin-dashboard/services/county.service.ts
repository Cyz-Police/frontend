import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { County } from '../interfaces/county';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import Constants from '../../../../config/constants';

@Injectable()
export class CountyService {
  private mainUrl = `${Constants.host}/county`;

  private getAllUrl = `${this.mainUrl}/getAll`;

  constructor(private http: Http) { }

  getAllCounties(): Observable<County[]> {
    return this.http.get(this.getAllUrl).map(this.extractData).catch(this.handleError);
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
