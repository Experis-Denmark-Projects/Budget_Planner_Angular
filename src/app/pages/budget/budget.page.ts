import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap, filter } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {

  // Form Controls
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  categoryForm = new FormGroup({
    name: this.name
  })

  constructor(private readonly userService:UserService, private readonly auth:AuthService){}

  ngOnInit(): void {
      
  }
  
  addCategory(){
    const category = {
      name: this.categoryForm.value.name as string,
    }

    const updatedUser = {...this.auth.User}
    
    this.userService.addCategoryObservable({
      ...category,
      user: this.auth.User.id
    }).pipe(
      switchMap(() => {
        return this.userService.addCategoryObservable(category);
      }),
      filter(response => {
        if(response.status === 200){
          console.log(`Create category success`);
          return true
        }else{
          // Prompt User that category could not be created
          console.log(`Failed to create category \nResponse Status: ${response.status}`);
          return false
        }
      }),
      switchMap(() => {
        return this.userService.updateUser()
      })
    ).subscribe((response:HttpResponse<void>) => {
      if(response.status === 202){
        this.auth.User = updatedUser
        console.log(`Updated User success`);
      }else {
        // Prompt User that changes could not be made
        console.log(`Failed to Update user`);
      }
    })
  }

}
