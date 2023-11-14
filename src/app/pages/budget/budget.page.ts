import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {

  categories:Category[] = []
  categories$:Observable<Category[]>
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
    public readonly auth:AuthService){
      this.categories$ = this.categoryService.getCategoriesObservable()
    }

  ngOnInit(): void {
    // Fetch User Categories
    this.auth.loggedIn$.subscribe(() => {
      this.categoryService.getCategoriesObservable().subscribe((categories:Category[]) => {
        this.categories = categories;
      })
    })

    this.categories$ = this.categoryService.getCategoriesObservable()
  }

  addCategory(){
    console.log(`${this.auth.User.id}`)
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
