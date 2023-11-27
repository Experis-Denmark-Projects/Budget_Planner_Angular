import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, Subject  } from 'rxjs'
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '@auth0/auth0-angular';
import { addCategory, deleteCategory } from 'src/app/redux/actions/category.actions';
import { selectCategories } from 'src/app/redux/selectors/categories.selectors';
import { categoryTotalExpense, remainingBudget, selectExpenses } from 'src/app/redux/selectors/expenses.selectors';
import { Expense } from 'src/app/models/expense.model';
import { deleteExpense } from 'src/app/redux/actions/expenses.actions';
import { ActivatedRoute } from '@angular/router';
import { selectTotalBudget } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {
  categories$: Observable<Category[]> = new Observable<Category[]>
  remainingBudget$:Observable<number> = new Observable<number>
  total$:Observable<number> = new Observable<number>
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
    this.categories$ = this.store.select(selectCategories())
    this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(params => {
      
      this.total$ = this.store.select(selectTotalBudget);
      this.remainingBudget$ = this.store.select(remainingBudget);
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

  updateChart(){
    console.log('Called!')
    if(this.showGraph){
      this.input = []
      this.categories$.subscribe({
        next:(categories:Category[]) => {
          categories.map((category:Category)  => {
            if(category.id){
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
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      expenses: []
    }
    this.categoryService.postCategoryObservable(category).subscribe(
      ((category:Category) => {
        this.store.dispatch(addCategory({category}))
        this.name.setValue('');
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
