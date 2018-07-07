import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService) { }

    ngOnInit() {
    }

    onSave() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: Response) => console.log(response.json()));
    }

    onFetch() {
        this.dataStorageService.fetchRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}
