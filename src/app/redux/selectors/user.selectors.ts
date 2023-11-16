import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AuthState } from '../reducers/user.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = () => createSelector(
    selectAuthState,
    auth => auth.user
)

export const selectTotalBudget = createSelector(
    selectAuthState,
    auth => auth.user?.totalBudget ?? 0
)

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => !!auth.user
)