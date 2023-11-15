import { createReducer, on } from '@ngrx/store';
import { Expense } from 'src/app/models/expense.model';
import { ExpensesActions } from '../action-types';

export interface ExpensesState {
    expenses:Expense[]
}

export const initialExpensesState: ExpensesState = {
    expenses: []
}

export const expensesReducer = createReducer(
    initialExpensesState,

    on(ExpensesActions.getExpenses, (state, action) => {
        return {
            expenses: state.expenses
        }
    }),

    on(ExpensesActions.setExpenses, (state, action) => {
        return {
            expenses: action.expenses
        }
    })
)