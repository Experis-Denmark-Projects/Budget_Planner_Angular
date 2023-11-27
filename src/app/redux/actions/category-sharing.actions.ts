import { createAction, props } from '@ngrx/store';
import { CategorySharing } from 'src/app/models/category-sharing';

export const setCategorySharing = createAction(
  '[Budget Page] Set Category Sharings',
  props<{categorySharings: CategorySharing[]}>()
)

export const addCategorySharing = createAction(
  '[Budget Page] Add Expense',
  props<{categorySharing:CategorySharing}>()
)

export const updateCategorySharing= createAction(
  '[Profile Page] Update Expense',
  props<{categorySharing:CategorySharing}>()
)

export const deleteCategorySharing = createAction(
  '[Profile Page] Delete Expense',
  props<{categorySharing:CategorySharing}>()
)

export const setCategorySharingDefault = createAction(
  '[Profile Popup] Set Default CategorySharing'
)