import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import Constants from '../../../../config/constants';

@Injectable()
export class CategoryService {
  private mainUrl = `${Constants.host}/category`;

  private getAllUrl = `${this.mainUrl}/getAll`;

  constructor(private http: Http) { }

  getAllCategories(): Observable<Category[]> {
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
