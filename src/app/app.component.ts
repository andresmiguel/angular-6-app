import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    title = 'app';

    ngOnInit(): void {
        firebase.initializeApp({
            apiKey: "AIzaSyATPXuhBWMG-9n9iOgyfltiir4lPVkoxFg",
            authDomain: "recipe-book-277b9.firebaseapp.com"
        });
    }
}
