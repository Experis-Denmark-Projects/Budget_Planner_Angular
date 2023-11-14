import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { AuthService } from './auth.service';
import { Category } from '../models/category.model';
import { Expense } from '../models/expense.model';
import { filter, switchMap } from 'rxjs/operators'
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  apiUrl:string = environment.apiUrl

  categories:Category[] = []

  constructor(private readonly http:HttpClient, private readonly auth:AuthService) { 

    auth.user$.subscribe((user:User) => {
      if(user.id){
        this.getCategoriesObservable()
        .subscribe((categories:Category[]) => {
          this.categories = categories
      })
      }
    })
  }
  
  /***** Categpry Requests *****/
  getCategoriesObservable(): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`
    });

    return this.http.get<Category[]>(`${this.apiUrl}/private/user/category`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    });
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
  getExpensesObservable(id:number): Observable<Expense[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application json`
    });

    return this.http.get<Expense[]>(`${this.apiUrl}/private/user/category/${id}/expense`, {
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
