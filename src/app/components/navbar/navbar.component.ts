import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';
import { catchError, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AppState } from '@auth0/auth0-angular';
import {Store} from "@ngrx/store";
import { login } from 'src/app/redux/actions/user.actions';
import { NotificationComponent } from '../notification/notification.component';
import { Observable } from 'rxjs'
import { isLoggedIn, selectAuthState } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  imageUrl:string = '../../assets/profile-icon.png'
  token:string = ''
  isAuthenticated$: Observable<boolean> = new Observable<boolean>()
  constructor(
    public router:Router,
    public readonly auth:AuthService, 
    private popupService:PopupService, 
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private readonly userService:UserService,
    private store:Store<AppState>){
    this.popupService.popupClosed.subscribe(() => {
      this.dialog.getDialogById('popup-dialog')?.close()
    })
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
    this.auth.isAuthenticated$.subscribe((isAuthenticated:boolean) => {
      if(isAuthenticated){
        this.auth.isAuthenticated = isAuthenticated
        this.auth.accessToken$.pipe(
          switchMap((token:string) => {
            this.token = token
            this.auth.accessToken = token
            return this.userService.getUserObservable().pipe(
              catchError(error => this.userService.postUserObservable())
            )
          })
        ).subscribe((user:User) => {
          this.auth.User = user
          this.store.dispatch(login({
            isAuthenticated: true,
            accessToken: this.token,
            user: user
          }))
          this.auth.user$.next(user)
        })

        this.auth.idToken$.subscribe((idToken) => {
          if(idToken){
            this.imageUrl = idToken.picture ?? this.imageUrl;
          }
        })
      }
    })
  }

  openPopup(){
    this.popupService.openPopup();
    this.dialog.open(PopupComponent, {
      id: 'popup-dialog',
      width: '80px',
      height: '150px',
      position: {top: '60px', right: '20px'}
    })
  }

  openNotificationDialog(){
    this.dialog.open(NotificationComponent, {
      width: '250px',
      data: {}
    })
  }
}