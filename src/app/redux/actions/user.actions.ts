import { createAction, props } from '@ngrx/store';
import { User } from '@auth0/auth0-angular';

export const login = createAction(
    '[Login Page] User Login',
    props<{
        accessToken:string,
        isAuthenticated:boolean,
        user: User
    }>()
)

export const logout = createAction(
    '[Profile Popup] Logout'
)