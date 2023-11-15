import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';

export const getCategories = createAction(
    '[Budget Page] Get Category'
)

export const setCategories = createAction(
    '[Budget Page] Set Category',
    props<{categories:Category[]}>()
)