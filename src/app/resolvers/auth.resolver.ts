import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { AppState } from '@auth0/auth0-angular'
import { Store, select } from '@ngrx/store'

@Injectable()
export class AuthResolver implements Resolve<any> {

    constructor(private store:Store<AppState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
    }
}