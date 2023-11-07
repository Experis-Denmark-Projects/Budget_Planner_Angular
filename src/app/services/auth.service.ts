import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { AuthService as Auth0AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { catchError, filter, switchMap, takeWhile } from 'rxjs/operators'
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken:string = ''
  idToken:string = ''
  isAuthenticated:boolean = false
  user:User = {};
  private apiUrl = environment.apiUrl;
  constructor(private auth0:Auth0AuthService, private http: HttpClient) { 

    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated
      if(isAuthenticated){
        let headers = {}
        this.auth0?.getAccessTokenSilently().pipe(
          // Get Access Token
          switchMap((token:any) => {
            this.accessToken = token
            headers = new HttpHeaders({
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': `application/json`,
            })
            return token
          }),
          // Get User
          switchMap(() => {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': `application/json`,
            })
            return this.http.get(`${this.apiUrl}/private/user`, {
              headers: headers,
              withCredentials: true,
              observe: 'response',
              responseType: 'json'
            }).pipe(
              catchError(error => of(new HttpResponse({status: 400})))
            )
          }),
          switchMap((response:any) => {
            if(response.status !== 400){
              return response
            }else{
              return this.http.post(`${this.apiUrl}/private/user`, {}, {
                headers: headers,
                withCredentials: true,
                observe: 'response',
                responseType: 'json'
              }).pipe(
                catchError(error => of(new HttpResponse({status: 400})))
              )
            }
          }), 
          switchMap((response:any) => {
            //this.user = {...response.body, categories: []}
            console.log(`Response Body: ${response.body}`)
            return response
          }),
          switchMap((response:any) => {
            //this.user.categories = response.body
            //console.log(`Categories: ${this.user.categories}`)
            return response
          })
        ).subscribe()
      }
    })
  }

  login() {
    this.auth0.loginWithRedirect({
      appState: {
        target: '/'
      }
    }).subscribe({
      next: () => {

      }
    });
  }

  logout(){
    this.auth0.logout({
      logoutParams: {
        returnTo: `${window.location.origin}`
      }
    });
    localStorage.clear();
  }
}
