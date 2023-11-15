import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ExpensesState } from '../reducers/expenses.reducer';

export const selectExpensesState = createFeatureSelector<ExpensesState>('expenses');

export const selectExpenses = (id:number) => createSelector(selectExpensesState, (state) => state.expenses.filter(expense => expense.id === id))

export const categoryTotalExpense = (id:number) => createSelector(
    selectExpenses(id),
    expenses => expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0)
)

export const totalExpenses = createSelector(
    selectExpensesState,
    state => state.expenses.reduce((total, expense) => total + (expense.amount ?? 0) , 0)
)