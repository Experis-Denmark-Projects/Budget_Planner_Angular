import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, Subject  } from 'rxjs'
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@auth0/auth0-angular';
import { addCategory, deleteCategory, setCategories } from 'src/app/redux/actions/category.actions';
import { selectCategories, selectCategoriesState } from 'src/app/redux/selectors/categories.selectors';
import { selectExpenses } from 'src/app/redux/selectors/expenses.selectors';
import { Expense } from 'src/app/models/expense.model';
import { deleteExpense } from 'src/app/redux/actions/expenses.actions';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {
  categories$: Observable<Category[]> = new Observable<Category[]>
  budgetRemainder:number = 0
  // Form Controls
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  categoryForm = new FormGroup({
    name: this.name
  })

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    public readonly categoryService:CategoryService,
    public readonly auth:AuthService,
    private store: Store<AppState>,
    private activatedRoute:ActivatedRoute){}

  ngOnInit(): void { 
    console.log('Budget Page: OnInit')
    this.categories$ = this.store.select(selectCategories())

    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(params => {
      // You can handle parameters if needed
      console.log('Route parameters changed:', params);
    });
  }

  addCategory(){
    const category = {
      user: this.auth.User.id,
      name: this.categoryForm.value.name,
      expenses: []
    }
    this.categoryService.postCategoryObservable(category).subscribe(
      ((category:Category) => {
        this.store.dispatch(addCategory({category}))
      })
    )
  }

  onRemoveCategory(category:Category){

    if(category.id){
      this.categoryService.deleteCategoryObservable(category.id).subscribe(() => {
        // Prompt that category has been deleted
        // Delete Expenses & Category from store.
        if(category.id){
          this.store.select(selectExpenses(category.id)).subscribe((expenses:Expense[]) => {
            expenses.map(expense => {
              this.store.dispatch(deleteExpense({expense}))
            })
            this.store.dispatch(deleteCategory({category}))
          })
        }
      })
    }
  }
}
