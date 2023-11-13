import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';
import { catchError, switchMap, of, take, map, throwError, filter } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  imageUrl:string = '../../assets/profile-icon.png'

  constructor(public readonly auth:AuthService, 
    private popupService:PopupService, 
    private dialog: MatDialog,
    private readonly userDataService:UserDataService,
    private store:Store){
    this.popupService.popupClosed.subscribe(() => {
      this.dialog.getDialogById('popup-dialog')?.close()
    })
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated:boolean) => {
      if(isAuthenticated){
        this.auth.isAuthenticated = isAuthenticated
        this.auth.accessToken$
        .subscribe((token:string) => {
          this.auth.accessToken = token
          this.userDataService.get({}).pipe(
            catchError(() => this.userDataService.add({id:-1}))
        ).subscribe({
          next: (user:User) => {
            this.auth.User = user
            
          }
        })
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