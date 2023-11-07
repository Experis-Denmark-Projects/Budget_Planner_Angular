import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit{

  constructor(private readonly auth:AuthService){}

  ngOnInit(): void {
      
  }

  login(){
    this.auth.login()
  }

}
