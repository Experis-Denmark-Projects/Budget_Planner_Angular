import { createReducer, on } from '@ngrx/store';
import { CategorySharing } from 'src/app/models/category-sharing';
import { CategorySharingActions } from '../action-types';

export interface CategorySharingsState {
  categorySharings:CategorySharing[]
}

export const initialCategorySharingsState: CategorySharingsState = {
  categorySharings: []
}

export const categorySharingsReducer = createReducer(
  initialCategorySharingsState,

  on(CategorySharingActions.setCategorySharing, (state, action) => {
    return {
      categorySharings: action.categorySharings
    }
  }),

  on(CategorySharingActions.addCategorySharing, (state, action) => {
    return {
      categorySharings: [...state.categorySharings, action.categorySharing]
    }
  }),

  on(CategorySharingActions.updateCategorySharing, (state, action) => {
    return {
      categorySharings: state.categorySharings.map(categorySharing => categorySharing.id === action.categorySharing.id ? action.categorySharing : categorySharing)
    }
  }),

  on(CategorySharingActions.deleteCategorySharing, (state, action) => {
    return {
      categorySharings: state.categorySharings.filter(categorySharing => categorySharing.id !== action.categorySharing.id)
    }
  }),

  on(CategorySharingActions.setCategorySharingDefault, (state, action) => {
    return {
      categorySharings: []
    }
  })
)