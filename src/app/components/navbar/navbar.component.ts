import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';
import { catchError, switchMap, of, take, map, throwError, filter, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserEntityService } from 'src/app/services/user-entity.service';
import { first, tap } from 'rxjs/operators'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  imageUrl:string = '../../assets/profile-icon.png'
  constructor(
    public router:Router,
    public readonly auth:AuthService, 
    private popupService:PopupService, 
    private dialog: MatDialog,
    private readonly userService:UserService){
    this.popupService.popupClosed.subscribe(() => {
      this.dialog.getDialogById('popup-dialog')?.close()
    })
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated:boolean) => {
      if(isAuthenticated){
        this.auth.isAuthenticated = isAuthenticated
        this.auth.accessToken$.pipe(
          switchMap((token:string) => {
            this.auth.accessToken = token
            return this.userService.getUserObservable().pipe(
              catchError(error => this.userService.postUserObservable())
            )
          })
        ).subscribe((user:User) => {
          this.auth.User = user
          this.auth.loggedIn$.next()
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
}