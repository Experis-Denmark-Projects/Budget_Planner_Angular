import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService as Auth0AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken:string = ''
  user:User = {};
  private apiUrl = environment.apiUrl;

  constructor(private auth0:Auth0AuthService, private http: HttpClient) { 

    this.auth0.getAccessTokenSilently().pipe(
      // Get Access Token
      switchMap((token:any) => {
        console.log(`Access Token:${token}`)
        this.accessToken = token
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': `application/json`,
        })
        return this.http.post(`${this.apiUrl}/private/user`, {
          headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'json'
        })
      }),
      switchMap((user:any) => {
        console.log(`User:${user}`)
        this.user = {...user, categories: []}
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': `application/json`,
        })
        return this.http.get(`${this.apiUrl}/private/user/category`, {
          headers: headers,
          withCredentials: true,
          observe: 'response',
          responseType: 'json'
        })
      }),
      switchMap((categories:any) => {
        console.log(`Categories:${categories}`)
        this.user.categories = categories
        return categories
      })
    ).subscribe({
      next: () => {
        console.log('Called!')
      }
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

  }

  signup(){

  }
}
