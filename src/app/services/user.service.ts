import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
import { Observable, map, of, catchError, switchMap, filter } from 'rxjs'
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model'
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = environment.apiUrl
  constructor(private readonly http:HttpClient, private readonly auth:AuthService) { }

  /***** User Requests *****/
  getUserObservable():Observable<User>{
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

  postUserObservable():Observable<User>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.post<User>(`${this.apiUrl}/private/user`, {}, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  putUserObservable(user:User):Observable<User>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.put<User>(`${this.apiUrl}/private/user`, user, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  deleteUserObservable():Observable<User>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.delete<User>(`${this.apiUrl}/private/user`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }
}