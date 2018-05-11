import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Constants from '../../../config/constants';

import { Item } from './../interfaces/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
  private mainUrl = `${Constants.host}/item`;
  private serachUrl = `${this.mainUrl}/getById`;

  constructor(private http: HttpClient) { }

  getById(markId): Observable<Item> {
    return this.http.get(`${this.serachUrl}/${markId}`).map(res => res).catch(this.handleError);
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  };

}
