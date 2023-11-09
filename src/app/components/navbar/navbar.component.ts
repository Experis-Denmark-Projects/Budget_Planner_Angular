import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';
import { catchError, switchMap, of, take, map, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { HttpResponse } from '@angular/common/http';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  imageUrl:string = '../../assets/profile-icon.png'
  private initialized: boolean = false
  x:number = 0
  
  constructor(public readonly auth:AuthService, 
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
        this.auth.accessToken$.subscribe((token) => {
          this.auth.accessToken = token;
          this.userService.getUserObservable().subscribe({
            next: (user)=> {
              console.log(`Username: ${user.body?.username}`)
            },
            error:() => {
              this.userService.postUserObservable().subscribe((user) => {
                console.log(`Username: ${user.body?.username}`)
              })
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
