import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoriesActions } from '../action-types';
import { Expense } from 'src/app/models/expense.model';

export interface CategoriesState {
    categories:Category[]
}

export const initialCategoriesState: CategoriesState = {
    categories: []
}

export const categoriesReducer = createReducer(
    initialCategoriesState,

    on(CategoriesActions.setCategories, (state, action) => {
        return {
            categories: action.categories
        }
    }),

    on(CategoriesActions.addCategory, (state, action) => {
        return {
            categories: [...state.categories, action.category]
        }
    }),

    on(CategoriesActions.updateCategory, (state, action) => {
        return {
            categories: state.categories.map(category => category.id === action.category.id ? action.category : category)
        }
    }),

    on(CategoriesActions.deleteCategory, (state, action) => {
        return {
            categories: state.categories.filter(category => category.id !== action.category.id)
        }
    }),

    on(CategoriesActions.setCategoriesDefault, (state, action) => {
        return {
            categories: []
        }
    }),
)