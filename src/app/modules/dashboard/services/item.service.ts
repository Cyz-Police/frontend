import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from '../../../authentication/authentication.service';
import Constants from '../../../config/constants';

import { Item } from './../interfaces/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {
  private mainUrl = `${Constants.host}/item`;
  private serachUrl = `${this.mainUrl}/getById`;
  private pullUrl = `${this.mainUrl}/pull`;
  
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    })
  };
  
  private fileOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    }),
    responseType: 'text' as 'text'
  };

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) { }

  getById(markId): Observable<Item> {
    return this.http.get(`${this.serachUrl}/${markId}`).map(res => res).catch(this.handleError);
  }

  getList(dateFrom: Date, dateTo: Date) {
    return this.http.get(`${this.pullUrl}/${dateFrom}/${dateTo}`,this.fileOptions).map(res => new Blob(['\ufeff', res],{ type: 'text/csv' })).catch(this.handleError)
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