import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { AppState } from "../store/app.reducers";
import { Store } from "@ngrx/store";
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.State) => {
                const clonedReq = req.clone({
                    params: req.params.set('auth', authState.token)
                });
                return next.handle(clonedReq);
            })
    }
}