import { createAction, props } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';

export const setExpenses = createAction(
    '[Budget Page] Set Expenses',
    props<{expenses:Expense[]}>()
)

export const addExpense = createAction(
    '[Budget Page] Add Expense',
    props<{expense:Expense}>()
)

export const updateExpense = createAction(
    '[Budget Page] Update Expense',
    props<{expense:Expense}>()
)

export const deleteExpense = createAction(
    '[Budget Page] Delete Expense',
    props<{expense:Expense}>()
)

export const setExpensesDefault = createAction(
    '[Profile Popup] Set Default Expenses'
)