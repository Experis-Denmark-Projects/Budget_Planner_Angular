import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { take, filter, switchMap, takeUntil } from 'rxjs/operators';
import { AppState } from '..';
import { CategoryService } from 'src/app/services/category.service';
import { setCategories } from '../actions/category.actions';
import { selectCategoriesState } from '../selectors/categories.selectors';
import { AuthService } from 'src/app/services/auth.service';
import { setExpenses } from '../actions/expenses.actions';
import { Category } from 'src/app/models/category.model';
import { CategoriesState } from '../reducers/categories.reducer';
import { Expense } from 'src/app/models/expense.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetResolver implements Resolve<Observable<any>> {

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private auth:AuthService,
    private categoryService: CategoryService // replace with the actual path to your service
  ) {}

  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectCategoriesState),
      take(1),
      filter(categoriesState => !categoriesState.isLoaded),
      switchMap(() => {
        this.auth.user$.subscribe(() => {
          this.categoryService.getCategoriesObservable().pipe(
            switchMap((categories:Category[]) => {
              this.store.dispatch(setCategories({categories:categories, isLoaded:true}));
              return this.categoryService.getAllExpensesObservable()
            }),
            switchMap((expenses:Expense[]) => {
              this.store.dispatch(setExpenses({expenses}));
              return of(true)
            })
          )
        })
        return of(true)
      })
    );
  }

  ngOnDestroy(){
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}

//<div class="budgetPageDiv" *ngFor="let category of categories$ | async">