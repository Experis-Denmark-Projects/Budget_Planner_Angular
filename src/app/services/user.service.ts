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
  
  getUser(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });

    this.http.get<User>(`${this.apiUrl}/private/user`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      catchError(error => {
        // Handle error here, for example, log the error.
        console.error('Error:', error);
        // Return an empty User or handle the error as needed.
        return of(null);
      })
    ).subscribe((user: User | null) => {
      if (user !== null) {
        this.auth.User = user;
      }
    });
  }

    /***** Categpry Requests *****/

    getCategories(): Observable<Category[]> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.auth.accessToken}`,
        'Content-Type': `application json`
      });
  
      return this.http.get<Category[]>(`${this.apiUrl}/private/user/category`, {
        headers: headers,
        withCredentials: true,
        responseType: 'json'
      }).pipe(
        catchError(error => {
          // Handle error here, for example, log the error.
          console.error('Error:', error);
          // Return an empty array or handle the error as needed.
          return [];
        })
      );
    }
    /***** Expense Requests *****/
}
  
  /* getUser(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    })
    this.http.get<{}>(`${this.apiUrl}/private/user`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      switchMap((user: any) => {
        this.auth.User = {...user};
        return this.http.get<any>(`${this.apiUrl}/private/user/category`, {
          headers: headers,
          withCredentials: true,
          responseType: 'json'
        })
      }),
      map((response:any) => {
        const categories:Category[] = []
        response.map((category:any) => {
          if(category?.categoryId){
            this.http.get(`${this.apiUrl}/private/user/category/${category?.categoryId}/expense`, {
              headers: headers,
              withCredentials: true,
              responseType: 'json'
            }).subscribe((expenses:any) => {

              if(Array.isArray(expenses)){
                expenses.map((expense:any) => {
                  expense.category = {
                    category
                  }
                })
              }

              categories.push({
                ...response,
                expenses: {
                  ...expenses
                }
              })
              this.auth.User.categories = categories
            })
          }
        })
      }),
      catchError(error => of(new HttpResponse<void>))
    ).subscribe(() => {
      console.log(`User Categories: ${this.auth.User.categories?.length}`)
    });
  } */

  /* updateUser(): Observable<HttpResponse<void>>{
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
  } */



  /* addCategoryObservable(category: {}): Observable<HttpResponse<Category>> {
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
  } */



  /* addExpense(expense:{}): void{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });
    
    this.http.post<Expense>(`${this.apiUrl}/private/user/category/expense`, expense, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    }).pipe(
      map(() => {
        this.getUser();
      })
    ).subscribe(() => {})
  } */
