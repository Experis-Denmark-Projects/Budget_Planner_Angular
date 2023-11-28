import { createAction, props } from '@ngrx/store';
import { CategorySortingOptions } from 'src/app/models/category.model';

export const sortCategories = createAction(
  '[Sorting] Sort Categories',
  props<{ sortingOption: CategorySortingOptions}>()
)