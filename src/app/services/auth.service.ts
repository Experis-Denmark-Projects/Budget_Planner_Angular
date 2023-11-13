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
  private user:User = {id:-1};
  public isAuthenticated$:Observable<boolean>
  public accessToken$:Observable<string>
  private apiUrl = environment.apiUrl;

  public get User(){
    return this.user
  }

  public set User(value:User){
    this.user = value
  }

  constructor(private auth0:Auth0AuthService, private http: HttpClient) { 

    this.isAuthenticated$ = this.auth0.isAuthenticated$
    this.accessToken$ = this.auth0.getAccessTokenSilently()
  }

  login() {
    this.auth0.loginWithRedirect({
      appState: {
        target: '/budget'
      }
    })
    .subscribe({
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
