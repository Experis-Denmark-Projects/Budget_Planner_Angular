import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import { UserActions } from '../action-types';

@Injectable()
export class UserEffects {

    /* login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        tap(action => {
            // 
        })
    ), {dispatch: false}) */

    constructor(private actions$: Actions){}
}