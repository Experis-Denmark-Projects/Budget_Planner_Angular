import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

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