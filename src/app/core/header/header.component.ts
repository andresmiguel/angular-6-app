import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';
import { Logout } from '../../auth/store/auth.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(
        private dataStorageService: DataStorageService,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSave() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: Response) => console.log(response.json()));
    }

    onFetch() {
        this.dataStorageService.fetchRecipes();
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }
}
