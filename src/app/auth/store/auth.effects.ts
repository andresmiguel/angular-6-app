import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { TRY_SIGN_UP, TrySignUp, SIGN_UP, SET_TOKEN, TRY_SIGN_IN, TrySignIn, SIGN_IN, LOGOUT } from './auth.actions';
import { fromPromise } from 'rxjs/internal-compatibility';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignUp = this.actions$
        .ofType(TRY_SIGN_UP)
        .map((action: TrySignUp) => action.payload)
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(
                firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
            );
        })
        .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
        .mergeMap((token: string) => {
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
        });

    @Effect()
    authSignIn = this.actions$
        .ofType(TRY_SIGN_IN)
        .map((action: TrySignIn) => action.payload)
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(
                firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
            );
        })
        .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
        .mergeMap((token: string) => {
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
    });

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(LOGOUT)
        .do(() => {
            firebase.auth().signOut();
            this.router.navigate(['/']);
        });

    constructor(private actions$: Actions, private router: Router) { }
}