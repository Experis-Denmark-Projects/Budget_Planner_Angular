import { Component, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, filter, of, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css']
})
export class PopupComponent {

  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor(
    private popupService:PopupService, 
    private userService:UserService,
    public auth:AuthService, 
    public router:Router) {}

  onClose(){
    this.popupService.closePopup();
  }

  navigateToProfile(){
    this.onClose()
    this.router.navigateByUrl('/profile')
  }

  navigateToBudget(){
    this.onClose()
    this.router.navigateByUrl('/budget')
  }

  login(){
    this.onClose()
    this.auth.loggedIn$.next()
    this.auth.login()
}

  logout(){
    this.onClose()
    this.auth.logout()
  }
}
