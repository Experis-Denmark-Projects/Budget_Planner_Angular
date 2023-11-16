import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ExpensesState } from '../reducers/expenses.reducer';
import { selectTotalBudget } from './user.selectors';

export const selectExpensesState = createFeatureSelector<ExpensesState>('expenses');

export const selectExpenses = (id:number) => createSelector(selectExpensesState, (state) => state.expenses.filter(expense => expense.category === id))

export const categoryTotalExpense = (id:number) => createSelector(
    selectExpenses(id),
    expenses => expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0)
)

export const totalExpenses = createSelector(
    selectExpensesState,
    state => state.expenses.reduce((total, expense) => total + (expense.amount ?? 0) , 0)
)

export const remainingBudget = createSelector(
    totalExpenses,
    selectTotalBudget,
    (totalExpenses, totalBudget) => Math.max(0, totalBudget - totalExpenses)
)