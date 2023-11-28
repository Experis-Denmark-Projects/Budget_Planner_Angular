import {createFeatureSelector, createSelector} from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectCategorySortingState = createFeatureSelector<CategoriesState>('sortingMethod');

export const selectCategorySortingMethod = createSelector(
  selectCategorySortingState,
  state => state.sortingMethod
)

export const selectCategories = () => createSelector(
  selectCategoriesState,
  state => state.categories
)

export const selectCategory = (id:number) => createSelector(
  selectCategories(),
  categories => categories.find(category => category.id === id)
)

export const sortedByIdAscending = () => createSelector(
  selectCategories(),
  categories => [...categories].sort((a, b) => (a.id || 0) - (b.id || 0))
)

export const sortedByIdDescending = () => createSelector(
  selectCategories(),
  categories => [...categories].sort((a, b) => (b.id || 0) - (a.id || 0))
)

export const sortedByName = () => createSelector(
  selectCategories(),
  categories => [...categories].sort((a, b) => (a.name || '').localeCompare(b.name || ''))
);

export const sortedByCreatedAsc = () => createSelector(
  selectCategories(),
  categories => [...categories].sort((a, b) => (a.created || new Date(0)).getTime() - (b.created || new Date(0)).getTime())
);

export const sortedByLastModifiedDesc = () => createSelector(
  selectCategories(),
  categories => [...categories].sort((a, b) => (b.lastModified || new Date(0)).getTime() - (a.lastModified || new Date(0)).getTime())
);