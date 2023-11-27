import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

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

export const setUser = createAction(
  '[Profile Page] Set User',
  props<{user: User}>())