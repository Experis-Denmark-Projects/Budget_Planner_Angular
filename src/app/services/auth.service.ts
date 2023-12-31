import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthService as Auth0AuthService, IdToken } from '@auth0/auth0-angular';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../redux/actions/user.actions';
import { AppState } from '../redux';
import { setCategoriesDefault } from '../redux/actions/category.actions';
import { setExpensesDefault } from '../redux/actions/expenses.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken:string = ''
  idToken:string = ''
  isAuthenticated:boolean = false
  private user:User = {}
  public isAuthenticated$:Observable<boolean>
  public accessToken$:Observable<string>
  public idToken$:Observable<IdToken | null | undefined> = new Observable<IdToken | null | undefined>
  public user$:Subject<User> = new Subject<User>
  public loggedIn$: Subject<void> = new Subject<void>
  public get User(){
    return this.user
  }

  public set User(value:User){
    this.user = value
  }

  constructor(private auth0:Auth0AuthService, private http: HttpClient, private store:Store<AppState>) { 

    this.isAuthenticated$ = this.auth0.isAuthenticated$
    this.accessToken$ = this.auth0.getAccessTokenSilently()
    this.idToken$ = this.auth0.idTokenClaims$
  }

  login() {
    this.auth0.loginWithRedirect({
      appState: {
        target: '/budget'
      }
    })
  }

  logout(){
    this.isAuthenticated = false;
    this.auth0.logout({
      logoutParams: {
        returnTo: `${window.location.origin}`
      }
    }).subscribe(() => {
      this.store.dispatch(setCategoriesDefault())
      this.store.dispatch(setExpensesDefault())
 
    });
    this.store.dispatch(logout())
  }
}
