import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private readonly auth:AuthService, private readonly router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(`Guard`)
    if(this.auth.isAuthenticated){
      console.log(`Is Authenticated: ${this.auth.isAuthenticated}`)
      return true;
    }else {
      console.log(`Is Authenticated 2: ${this.auth.isAuthenticated}`)
      this.router.navigateByUrl('/')
      return false
    }
  }
}