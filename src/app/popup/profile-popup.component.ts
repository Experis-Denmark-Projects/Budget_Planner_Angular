import { Component, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css']
})
export class PopupComponent {

  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor(private popupService:PopupService, public auth:AuthService, public router:Router) {}

  onClose(){
    this.popupService.closePopup();
  }

  navigateToProfile(){
    this.onClose()
    this.router.navigateByUrl('/profile')
  }

  login(){
    this.onClose()
    this.auth.login()
  }

  logout(){
    this.onClose()
    this.auth.logout()
  }
}