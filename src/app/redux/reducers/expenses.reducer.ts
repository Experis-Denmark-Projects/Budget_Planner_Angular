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

  on(ExpensesActions.setExpenses, (state, action) => {
    return {
      expenses: action.expenses
    }
  }),

  on(ExpensesActions.addExpense, (state, action) => {
    return {
      expenses: [...state.expenses, action.expense]
    }
  }),

  on(ExpensesActions.updateExpense, (state, action) => {
    return {
      expenses: state.expenses.map(expense => expense.id === action.expense.id ? action.expense : expense)
    }
  }),

  on(ExpensesActions.deleteExpense, (state, action) => {
    return {
      expenses: state.expenses.filter(expense => expense.id !== action.expense.id)
    }
  }),

  on(ExpensesActions.setExpensesDefault, (state, action) => {
    return {
      expenses: []
    }
  }),
)