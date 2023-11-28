import { createAction, props } from '@ngrx/store';
import { Category, CategorySortingOptions } from 'src/app/models/category.model';

export const setCategories = createAction(
  '[Budget Page] Set Categories',
  props<{categories:Category[], isLoaded:boolean}>()
)

export const addCategory = createAction(
  '[Budget Page] Add Category',
  props<{category:Category}>()
)

export const updateCategory = createAction(
  '[Budget Page] Update Category',
  props<{category:Category}>()
)

export const deleteCategory = createAction(
  '[Budget Page] Delete Category',
  props<{category:Category}>()
)

export const setCategoriesDefault = createAction(
  '[Profile Popup] Set Default Categories'
)

export const sortCategoriesAlphabetic = createAction(
  '[Sorting] Sort Categories Alphabetically'
);

export const sortCategoriesByLastModified = createAction(
  '[Sorting] Sort Categories by Last Modified'
);

export const sortCategoriesByCreated = createAction(
  '[Sorting] Sort Categories by Created'
);

export const sortCategoriesDescending = createAction(
  '[Sorting] Sort Categories Descending'
);

export const sortCategoriesAscending = createAction(
  '[Sorting] Sort Categories Ascending'
);