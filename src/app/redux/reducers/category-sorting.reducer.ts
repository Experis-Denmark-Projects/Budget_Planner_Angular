import { createReducer, on } from '@ngrx/store';
import { CategorySortingActions } from '../action-types';
import { CategorySortingOptions } from 'src/app/models/category.model';

export interface CategorySortingState {
  categorySortingOptions: CategorySortingOptions
}

export const intialCategorySortingState: CategorySortingState = {
  categorySortingOptions: CategorySortingOptions.alphabetic,
};

export const categorySortingReducer = createReducer(
  intialCategorySortingState,
  on(CategorySortingActions.sortCategories, (state, { sortingOption }) => {
    return {...state, categorySortingOptions: sortingOption}
  })
);