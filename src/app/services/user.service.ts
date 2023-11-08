import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
import { Observable, map, of, catchError } from 'rxjs'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = environment.apiUrl
  constructor(private readonly http:HttpClient, private readonly auth:AuthService) { }

  addCategoryObservable(category: {}): Observable<HttpResponse<Category>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });

    return this.http.post<HttpResponse<Category>>(`${this.apiUrl}/private/user/category`, category, {
      headers: headers,
      withCredentials: true,
      observe: 'response',
      responseType: 'json'
    }).pipe(
      map(response => {
        return new HttpResponse<Category>({
          body: {...response?.body, expenses: []},
          headers: response?.headers,
          status: response?.status,
          statusText: response?.statusText,
          url: response?.url ?? '',
        });
      })
    );
  }

  updateUser(): Observable<HttpResponse<void>>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    })

    return this.http.put<HttpResponse<void>>(`${this.apiUrl}/private/user`, this.auth.User, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      map(response => {
        return new HttpResponse<void>({
          body: response?.body,
          headers: response?.headers,
          status: response?.status,
          statusText: response?.statusText,
          url: response?.url ?? ''
        })
      })
    )
  }
}
