import { User } from '@auth0/auth0-angular';
import { createReducer } from '@ngrx/store';

export interface AuthState {
    user: User
}

export const initialAuthState: AuthState = {
    user: {}
}