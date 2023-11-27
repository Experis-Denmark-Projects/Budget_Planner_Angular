import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store'
import { environment } from 'src/environments/environment.development';
import { userReducer } from './reducers/user.reducer';
import { categoriesReducer } from './reducers/categories.reducer';
import { expensesReducer } from './reducers/expenses.reducer';
import { categorySharingsReducer } from './reducers/category-sharings.reducer';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: userReducer,
  categories: categoriesReducer,
  expenses: expensesReducer,
  categorySharings: categorySharingsReducer
}

export function logger(reducer:ActionReducer<any>):ActionReducer<any>{
  return (state, action) => {
    //console.log("state before: ", state);
    //console.log("action", action);

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];