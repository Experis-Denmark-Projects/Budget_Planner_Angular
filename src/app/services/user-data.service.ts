import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { User } from '../models/user.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

@Injectable()
export class UserDataService extends DefaultDataService<User> {

  apiUrl:string = environment.apiUrl

  constructor(
    http:HttpClient, 
    httpUrlGenerator: HttpUrlGenerator, 
    private auth:AuthService){
    super('User', http, httpUrlGenerator)

  }

  override getById(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });

    return this.http.get<User>(`${this.apiUrl}/private/user`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    }) 
  }

  override add(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    
    return this.http.post<User>(`${this.apiUrl}/private/user`, {id:-1}, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }
}
