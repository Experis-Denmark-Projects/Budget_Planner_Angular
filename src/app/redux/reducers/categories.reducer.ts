import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoriesActions } from '../action-types';

export interface CategoriesState {
    categories:Category[],
    isLoaded?:boolean
}

export const initialCategoriesState: CategoriesState = {
    categories: [],
    isLoaded:false
}

export const categoriesReducer = createReducer(
  initialCategoriesState,

  on(CategoriesActions.setCategories, (state, action) => {
    return {
      categories: action.categories,
      isLoaded: action.isLoaded
    }
  }),

  on(CategoriesActions.addCategory, (state, action) => {
    return {
      categories: [...state.categories, action.category],
      isLoaded: true
    }
  }),

  on(CategoriesActions.updateCategory, (state, action) => {
    return {
      categories: state.categories.map(category => category.id === action.category.id ? action.category : category),
      isLoaded: state.isLoaded
    }
  }),

  on(CategoriesActions.deleteCategory, (state, action) => {
    return {
      categories: state.categories.filter(category => category.id !== action.category.id),
      isLoaded: state.isLoaded
    }
  }),

  on(CategoriesActions.setCategoriesDefault, (state, action) => {
    return {
      categories: [],
      isLoaded: false
    }
  }),

  /* Sorting Reducers */

  on(CategoriesActions.sortCategoriesAlphabetic, (state, action) => {
    return {
      categories: state.categories.length > 0 ? [...state.categories].sort((a, b) => (a.name || '').localeCompare(b.name || '')) : state.categories,
      isLoaded: state.isLoaded
    }
  }),

  on(CategoriesActions.sortCategoriesByCreated, (state, action) => {
    return {
      categories: [...state.categories].sort((a, b) => {
        const dateA = a.created instanceof Date ? a.created : new Date(0);
        const dateB = b.created instanceof Date ? b.created : new Date(0);
        return dateA.getTime() - dateB.getTime();
      }),
      isLoaded: state.isLoaded
    }
  }),


  on(CategoriesActions.sortCategoriesByCreated, (state, action) => {
    return {
      categories: [...state.categories].sort((a, b) => {
        const dateA = new Date(a.created ?? 0);
        const dateB = new Date(b.created ?? 0);
        return dateA.getTime() - dateB.getTime();
      }),
      isLoaded: state.isLoaded,
    };
  }),
)