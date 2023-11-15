import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoriesActions } from '../action-types';
import { Expense } from 'src/app/models/expense.model';

export interface CategoriesState {
    categories:Category[],
}

export const initialCategoriesState: CategoriesState = {
    categories: [],
}

export const categoriesReducer = createReducer(
    initialCategoriesState,

    on(CategoriesActions.getCategories, (state, action) => {
        return {
            categories: state.categories,
        }
    }),

    on(CategoriesActions.setCategories, (state, action) => {
        return {
            categories: action.categories,
        }
    })
)