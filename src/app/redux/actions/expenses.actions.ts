import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const getExpenses = createAction(
    '[Budget Page] Get Expenses'
)

export const setExpenses = createAction(
    '[Budget Page] Set Expenses',
    props<{expenses:Expense[]}>()
)