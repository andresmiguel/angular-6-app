import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { TRY_SIGN_UP, TrySignUp, SIGN_UP, SET_TOKEN, TRY_SIGN_IN, TrySignIn, SIGN_IN, LOGOUT } from './auth.actions';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$
        .ofType(TRY_SIGN_UP)
        .pipe(
            map((action: TrySignUp) => action.payload),
            switchMap((authData: {username: string, password: string}) => {
                return from(
                    firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
                );
            }),
            switchMap(() => from(firebase.auth().currentUser.getIdToken())),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: SIGN_UP
                    },
                    {
                        type: SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    @Effect()
    authSignIn = this.actions$
        .ofType(TRY_SIGN_IN)
        .pipe(
            map((action: TrySignIn) => action.payload),
            switchMap((authData: {username: string, password: string}) => {
                return from(
                    firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
                );
            }),
            switchMap(() => from(firebase.auth().currentUser.getIdToken())),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    {
                        type: SIGN_IN
                    },
                    {
                        type: SET_TOKEN,
                        payload: token
                    }
                ];
            })
        );

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(LOGOUT)
        .pipe(tap(() => {
            firebase.auth().signOut();
            this.router.navigate(['/']);
        }));

    constructor(private actions$: Actions, private router: Router) { }
}