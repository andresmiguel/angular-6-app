import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Logout } from '../../auth/store/auth.actions';
import { AppState } from '../../store/app.reducers';
import { SaveRecipes, LoadRecipes } from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSave() {
        this.store.dispatch(new SaveRecipes());
    }

    onFetch() {
        this.store.dispatch(new LoadRecipes());
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}
