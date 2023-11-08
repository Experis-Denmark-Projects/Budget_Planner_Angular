import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage {
  
  validNumber(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      if (value === null || value === undefined || value === '') {
        return null; // Allow empty values
      }
      
      const isValid = /^[0-9]+$/.test(value);
      return isValid ? null : { invalidNumber: { value: control.value } };
    };
  }


  // Form Controls
  totalBudget = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    this.validNumber()
  ])

  categoryForm = new FormGroup({
    totalBudget: this.totalBudget
  })



  constructor(private readonly userService:UserService, private readonly auth:AuthService){}

  setTotalBudget(){

  }

}
