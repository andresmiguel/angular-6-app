import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducers";
import * as fromAuth from '../auth/store/auth.reducers';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.store.select('auth')
            .pipe(
                take(1),
                map((authState: fromAuth.State) => authState.authenticated)
            );
    }
}