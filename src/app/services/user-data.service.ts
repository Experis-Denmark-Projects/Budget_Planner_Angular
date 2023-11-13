import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefaultDataService, EntityActionFactory, EntityOp, HttpUrlGenerator } from '@ngrx/data';
import { User } from '../models/user.model';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { Actions } from '@ngrx/effects';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DefaultDataService<User> {

  apiUrl:string = environment.apiUrl

  constructor(
    http:HttpClient, 
    httpUrlGenerator: HttpUrlGenerator, 
    private auth:AuthService, 
    private actions$:Actions,
    private entityActionFactory: EntityActionFactory,
    private store:Store){
    super('User', http, httpUrlGenerator)

    this.actions$
      .pipe(filter((action) => action.type.startsWith('[User]')))
      .subscribe((action) => {
        console.log('User action:', action);
      });

  }

  get(options:HttpOptions): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.accessToken}`,
      'Content-Type': `application/json`,
    });

    const entityAction = this.entityActionFactory.create('User', EntityOp.QUERY_ALL, { /* optional payload */ });
    this.store.dispatch(entityAction);

    return this.http.get<User>(`${this.apiUrl}/private/user`, {
      headers: headers,
      withCredentials: true,
      responseType: 'json'
    })
  }

  override add(entity: User, options?: HttpOptions | undefined): Observable<User> {
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
}
