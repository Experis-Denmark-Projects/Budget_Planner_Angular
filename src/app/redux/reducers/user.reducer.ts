import { User } from '@auth0/auth0-angular';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../action-types';

export interface AuthState {
    accessToken: string,
    isAuthenticated: boolean,
    user: User
}

export const initialAuthState: AuthState = {
    accessToken: '',
    isAuthenticated: false,
    user: {}
}

export const userReducer = createReducer(
    initialAuthState,

    on(UserActions.login, (state, action) => {
        return {
            accessToken: action.accessToken,
            isAuthenticated: action.isAuthenticated,
            user: action.user
        }
    }),

    on(UserActions.logout, (state, action) => {
        return {
            accessToken: '',
            isAuthenticated: false,
            user: {}
        }
    })
)