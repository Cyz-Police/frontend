import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Item } from './../interfaces/item';
import { AuthenticationService } from '../../../authentication/authentication.service';
import Constants from '../../../config/constants';

@Injectable()
export class ItemService {
  private mainUrl = `${Constants.host}/item`;
  private serachUrl = `${this.mainUrl}/getById`;
  private pullUrl = `${this.mainUrl}/pull`;
  
  private headers = this.authService.getHeaders();

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
  ) { };

  getById(markId) {
    return this.http.get<Item>(`${this.serachUrl}/${markId}`, this.headers).pipe(catchError(err => this.handleError(err)));
  };

  getList(dateFrom: Date, dateTo: Date) {
    return this.http.get(`${this.pullUrl}/${dateFrom}/${dateTo}`, this.fileOptions).pipe(catchError(err => this.handleError(err)));
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status == 401 || error.status == 403)
        return this.authService.logout();
    return Observable.throw('Serverio klaida')
  };
}