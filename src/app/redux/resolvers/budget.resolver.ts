import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
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
import { Expense } from 'src/app/models/expense.model';
import { Subject } from 'rxjs';
import { CategorySharing } from 'src/app/models/category-sharing';
import { setCategorySharing } from '../actions/category-sharing.actions';

@Injectable({
  providedIn: 'root'
})
export class BudgetResolver implements Resolve<Observable<any>> {

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private auth:AuthService,
    private categoryService: CategoryService,
  ) {}

  resolve(): Observable<any> {
    return this.store.pipe(
      select(selectCategoriesState),
      take(1),
      switchMap((categoriesState) => {
        if (!categoriesState.isLoaded) {
          // Only proceed with fetching data if isLoaded is false
          return this.auth.user$.pipe(
            takeUntil(this.ngUnsubscribe$),
            switchMap(() => {
              return this.categoryService.getCategoriesObservable().pipe(
                switchMap((categories: Category[]) => {
                  this.store.dispatch(setCategories({ categories, isLoaded: true }));
                  return this.categoryService.getAllExpensesObservable();
                }),
                switchMap((expenses: Expense[]) => {
                  this.store.dispatch(setExpenses({ expenses }));
                  return of(true);
                  //return this.categoryService.getCategorySharingsObservable();
                }),
                /* switchMap((categorySharings: CategorySharing[]) => {
                  this.store.dispatch(setCategorySharing({ categorySharings }));
                  return of(true);
                }) */
              );
            })
          );
        } else {
          // If isLoaded is already true, resolve immediately
          return of(true);
        }
      }),
      takeUntil(this.ngUnsubscribe$)
    );
  }

  ngOnDestroy(){
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}