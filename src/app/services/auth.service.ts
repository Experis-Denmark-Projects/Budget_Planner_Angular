import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { AuthService as Auth0AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { catchError, filter, switchMap, takeWhile } from 'rxjs/operators'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken:string = ''
  idToken:string = ''
  user:User = {};
  private apiUrl = environment.apiUrl;

  constructor(private auth0:Auth0AuthService, private http: HttpClient) { 

    let headers = {}

    this.auth0.getAccessTokenSilently().pipe(
      // Get Access Token
      switchMap((token:any) => {
        this.accessToken = token
        headers = new HttpHeaders({
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': `application/json`,
        })
        return token
      }),
      switchMap(() => {
        return this.http.get(`${this.apiUrl}/private/user`, {
          headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'json'
        }).pipe(
          catchError(error => of(new HttpResponse({status: 400})))
        )
      }),
      // If user does not exists run next switchMap otherwise skip
      filter((response) => response.status === 400),
      switchMap(() => {
        return this.http.post(`${this.apiUrl}/private/user`, {}, {
          headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'json'
        }).pipe(
          catchError(error => of(new HttpResponse({status: 400})))
        )
      }), 
      takeWhile((response) => response.status !== 400),
      // Get user if response status is not 400.
      switchMap((user:any) => {
        this.user = {...user, categories: []}
        return this.http.get(`${this.apiUrl}/private/user/category`, {
          headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'json'
        })
      }),
      switchMap((categories:any) => {
        this.user.categories = categories
        return categories
      })
    ).subscribe(() => {
      console.log(`Username: ${this.user.username}`)
      console.log(`Email: ${this.user.email}`)
      console.log(`Total Budget: ${this.user.totalBudget}`)
      console.log(`Categories: ${this.user.categories}`)
    })
  }

  login() {
    this.auth0.loginWithRedirect({
      appState: {
        target: '/budget'
      }
    }).subscribe({
      next: () => {

      }
    });
  }

  logout(){
    this.auth0.logout();
  }
}
