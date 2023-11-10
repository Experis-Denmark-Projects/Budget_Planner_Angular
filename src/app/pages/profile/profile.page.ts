import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '@auth0/auth0-angular';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage {
  
 


  user?: User;

  // Form Controls
  totalBudget = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    
  ])

  userForm = new FormGroup({
    totalBudget: this.totalBudget
  })



  constructor(private readonly userService:UserService, private readonly auth:AuthService){}

  setTotalBudget(){
    const newTotalBudget = Number(this.userForm.get('totalBudget')?.value);
    

    console.log(`${typeof newTotalBudget}`)

      this.userService.putUserObservable({...this.auth.User, totalBudget:newTotalBudget})
      .subscribe(updatedUser =>{
       this.user = updatedUser;
      });

    

  }



}
