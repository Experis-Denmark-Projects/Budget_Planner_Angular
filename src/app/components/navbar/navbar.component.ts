import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';
import { MatDialog } from '@angular/material/dialog'
import { PopupComponent } from 'src/app/popup/profile-popup.component';

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

    
  }

  ngOnInit(): void {
      
  }

  openPopup(){
    this.popupService.openPopup();
    this.dialog.open(PopupComponent, {
      id: 'popup-dialog',
      width: '70px',
      height: '100px',
      position: {top: '60px', right: '20px'}
    })
  }
}
