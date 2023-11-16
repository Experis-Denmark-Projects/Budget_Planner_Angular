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
import { categoryTotalExpense, selectExpenses } from 'src/app/redux/selectors/expenses.selectors';
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

  input:{ name: string; totalPrice: number }[] = []
  showGraph:boolean = false

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

  showPieChart(){
    if(this.showGraph){
      this.showGraph = !this.showGraph
      this.input = []
    }else{
      this.categories$.subscribe({
        next:(categories:Category[]) => {
          categories.map((category:Category)  => {
            
            if(category.id){
              console.log(`Show Graph: ${this.showGraph}`)
              const total = this.store.select(categoryTotalExpense(category.id));
              total.subscribe({
                next: (val) => {
                  this.input.push({name: category.name ?? '', totalPrice: val})
                  this.showGraph = true;
                }
              })
            }
    
          })
        }
      })
    }
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
