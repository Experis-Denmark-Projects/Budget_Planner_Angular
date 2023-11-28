import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoriesActions } from '../action-types';

export interface CategoriesState {
    categories:Category[],
    isLoaded?:boolean,
    sortingMethod: string
}

export const initialCategoriesState: CategoriesState = {
  categories: [],
  isLoaded:false,
  sortingMethod: 'LastModified',
}

export const categoriesReducer = createReducer(
  initialCategoriesState,

  on(CategoriesActions.setCategories, (state, action) => {
    return {
      categories: action.categories,
      isLoaded: action.isLoaded,
      sortingMethod: state.sortingMethod
    }
  }),

  on(CategoriesActions.addCategory, (state, action) => {
    return {
      categories: [...state.categories, action.category],
      isLoaded: true,
      sortingMethod: state.sortingMethod
    }
  }),

  on(CategoriesActions.updateCategory, (state, action) => {
    return {
      categories: state.categories.map(category => category.id === action.category.id ? action.category : category),
      isLoaded: state.isLoaded,
      sortingMethod: state.sortingMethod
    }
  }),

  on(CategoriesActions.deleteCategory, (state, action) => {
    return {
      categories: state.categories.filter(category => category.id !== action.category.id),
      isLoaded: state.isLoaded,
      sortingMethod: state.sortingMethod
    }
  }),

  on(CategoriesActions.setCategoriesDefault, (state, action) => {
    return {
      categories: [],
      isLoaded: false,
      sortingMethod: 'LastModified'
    }
  }),

  /* Sorting Reducers */

  on(CategoriesActions.sortCategoriesAlphabetic, (state, action) => {
    return {
      categories: state.categories.length > 0 ? [...state.categories].sort((a, b) => (a.name || '').localeCompare(b.name || '')) : state.categories,
      isLoaded: state.isLoaded,
      sortingMethod: state.sortingMethod
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
      sortingMethod: state.sortingMethod
    }
  }),


  on(CategoriesActions.sortCategoriesByLastModified, (state, action) => {
    return {
      categories: [...state.categories].sort((a, b) => {
        const dateA = new Date(a.lastModified ?? 0);
        const dateB = new Date(b.lastModified ?? 0);
        return dateB.getTime() - dateA.getTime();
      }),
      isLoaded: state.isLoaded,
      sortingMethod: state.sortingMethod
    };
  }),
)