import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { AuthService as Auth0AuthService } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { catchError, switchMap } from 'rxjs/operators'
import { forkJoin, of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken:string = ''
  idToken:string = ''
  isAuthenticated:boolean = false
  user:User = {};
  public isAuthenticated$:Observable<boolean>
  public accessToken$:Observable<string>
  private apiUrl = environment.apiUrl;

  public get User(){
    return this.user
  }

  constructor(private auth0:Auth0AuthService, private http: HttpClient) { 

    this.isAuthenticated$ = this.auth0.isAuthenticated$
    this.accessToken$ = this.auth0.getAccessTokenSilently()

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
          // Get User if exists othewise crete new user
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
          // Get Categories
          switchMap((responses:any[]) => {
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
    this.isAuthenticated = false;
    this.auth0.logout({
      logoutParams: {
        returnTo: `${window.location.origin}`
      }
    });
  }
}
