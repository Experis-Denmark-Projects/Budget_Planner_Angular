import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  popupClosed = new EventEmitter<void>();

  openPopup(){
    
  }

  closePopup(){
    this.popupClosed.emit();
  }
}
