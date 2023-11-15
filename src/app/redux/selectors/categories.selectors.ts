import {createFeatureSelector, createSelector} from '@ngrx/store';
import { CategoriesState } from '../reducers/categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');