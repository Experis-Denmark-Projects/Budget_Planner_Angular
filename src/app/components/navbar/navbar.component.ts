import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';
import { of } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  imageUrl:string = '../../assets/profile-icon.png'
  

  constructor(public readonly auth:AuthService, private popupService:PopupService, private dialog: MatDialog){
    this.popupService.popupClosed.subscribe(() => {
      this.dialog.getDialogById('popup-dialog')?.close()
    })

    this.auth.accessToken$.pipe(
      catchError(error => {
        console.log(`Navbar Access Token Error`)
        return of()
      })
    ).subscribe({
      next: (accessToken:string) => {
        if(auth.isAuthenticated){
            
        }
      },
      error: () => {
        
      }
    })
  }

  ngOnInit(): void {
      
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
