import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit{
  isSmashed:boolean = false;

  constructor(public readonly auth:AuthService){}

  ngOnInit(): void {
    
  }

  login(){
    this.auth.loggedIn$.next()
    this.auth.login()
  }

  smash(){
    if(this.isSmashed==true){
      this.isSmashed = false
    }else{
      this.isSmashed = true
    }

  }
}
