import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {

  categories:Category[] = []
  budgetRemainder:number = 0
  // Form Controls
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  categoryForm = new FormGroup({
    name: this.name
  })

  constructor(
    public readonly categoryService:CategoryService,
    public readonly auth:AuthService){}

  ngOnInit(): void {
    // Fetch User Categories
    this.auth.accessToken$.subscribe((token) => {
      this.auth.accessToken = token;
      this.categoryService.getCategoriesObservable().subscribe((categories:Category[]) => {
        this.categories = categories;
      })
    })
  }

  addCategory(){
    const category = {
      user: this.auth.User.id,
      name: this.categoryForm.value.name,
      expenses: []
    }
    this.categoryService.postCategoryObservable(category).subscribe(
      ((category:Category) => {
        this.categories.push(category)
      })
    )
  }
}
