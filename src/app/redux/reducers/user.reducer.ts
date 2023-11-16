import { User } from 'src/app/models/user.model';
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
    }),

    on(UserActions.setUser, (state, action) => {
        return {
            accessToken: state.accessToken,
            isAuthenticated: state.isAuthenticated,
            user: action.user
        }
    })
)