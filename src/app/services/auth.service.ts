import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http'
import { AuthService as Auth0AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { catchError, switchMap, tap} from 'rxjs/operators'
import { forkJoin, of } from 'rxjs';

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
            return this.http.get(`${this.apiUrl}/private/user`, {
              headers: headers,
              withCredentials: true,
              observe: 'response',
              responseType: 'json'
            }).pipe(
              catchError(error => of(new HttpResponse({ status: 400 })))
            )
          }),
          switchMap((response:any) => {
            if(response?.status !== 400){
              return of(response)
            }else{
              const createUserRequest = this.http.post(`${this.apiUrl}/private/user`, {}, {
                headers: headers,
                withCredentials: true,
                observe: 'response',
                responseType: 'json'
              }).pipe(
                catchError(error => of(new HttpResponse({status: 400})))
              );

              return forkJoin([of(response), createUserRequest]);
            }
          }), 
          switchMap((responses:any[]) => {
            //this.user = {...response.body, categories: []}
            if(responses[0]?.status === 400){
              this.user = {...responses[1]?.body, categories: [] }
            }else{
              this.user = {...responses[0]?.body, categories: [] }
            }

            return this.http.get(`${this.apiUrl}/private/user/category`, {
              headers: headers,
              withCredentials: true,
              observe: 'response',
              responseType: 'json'
            }).pipe(
              catchError(error => of(new HttpResponse({ status: 400 }))
            ));
          }),
          switchMap((response: any) => {
            if(response?.status !== 400){
              this.user.categories = response?.body;
            }

            return of(response)
          }),
          catchError(error => of(new HttpResponse({ status: 400 })))
        ).subscribe({
          error: (error => {

          })
        })
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
