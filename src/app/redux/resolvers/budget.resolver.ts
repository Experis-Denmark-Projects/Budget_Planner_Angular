import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { take, filter, switchMap } from 'rxjs/operators';
import { AppState } from '..';
import { setCategories } from '../actions/category.actions';

export class BudgetResolver implements Resolve<Observable<any>> {
    constructor(private store: Store<AppState>){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<Observable<any>> | Promise<Observable<any>> {
        return this.store.pipe(
            select('categories'),
            take(1),
            filter(state => !state.isLoaded),
            switchMap(() => {
                this.store.dispatch(setCategories({categories:[]}));
                return this.store.pipe(
                    select('categories'),
                    filter(state => state.isLoaded),
                    take(1)
                )
            })
        )
    }
}

//<div class="budgetPageDiv" *ngFor="let category of categories$ | async">