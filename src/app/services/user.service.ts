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


  /***** Categpry Requests *****/
  getCategoriesObservable(): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application json`
    });

    return this.http.get<Category[]>(`${this.apiUrl}/private/user/category`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  getCategoryObservable(id:number): Observable<Category> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application json`
    });

    return this.http.get<Category>(`${this.apiUrl}/private/user/category/${id}`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  postCategoryObservable(category:{}):Observable<Category>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.post<Category>(`${this.apiUrl}/private/user/category`, category, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  putCategoryObservable(category:Category):Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.put<void>(`${this.apiUrl}/private/user/category/${category.id}`, category, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  deleteCategoryObservable(id:number):Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.delete<void>(`${this.apiUrl}/private/user/category/${id}`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  /***** Expense Requests *****/
  getExpensesObservable(): Observable<Expense[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application json`
    });

    return this.http.get<Expense[]>(`${this.apiUrl}/private/user/expense`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  postExpenseObservable(expense:Expense):Observable<Expense>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.post<Expense>(`${this.apiUrl}/private/user/category/${expense.category}/expense`, expense, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  putExpenseObservable(expense:Expense):Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.put<void>(`${this.apiUrl}/private/user/category/${expense.category}/expense`, expense, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  deleteExpenseObservable(expense:Expense):Observable<void>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    return this.http.delete<void>(`${this.apiUrl}/private/user/category/expense/${expense.id}`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }
}