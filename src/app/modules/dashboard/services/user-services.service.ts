import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { User } from '../interfaces/user';
import { AuthenticationService } from '../../../authentication/authentication.service';
import Constants from '../../../config/constants';

@Injectable()
export class UserServicesService {
  private mainUrl = `${Constants.host}/user`;

  private getAllUrl = `${this.mainUrl}/getByCounty`;
  private deactivationUrl = `${this.mainUrl}/deactivate`;
  private activationUrl = `${this.mainUrl}/activate`;

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {};

  getAllUsers() {
    return this.http.get<User[]>(this.getAllUrl, this.options).pipe(catchError(err => this.handleError(err)));
  };

  deactivateUser(userId: String) {
    return this.http.post(this.deactivationUrl, { userId }, this.options).pipe(catchError(err => this.handleError(err)));
  };

  activateUser(userId: String) {
    return this.http.post(this.activationUrl, { userId }, this.options).pipe(catchError(err => this.handleError(err)));
  };

  private handleError(error: HttpErrorResponse) {
    if (error.status == 401 || error.status == 403)
        return this.authService.logout();
    return Observable.throw('Serverio klaida')
  };
}
