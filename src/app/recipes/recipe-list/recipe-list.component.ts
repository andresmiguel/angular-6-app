import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeatureState, State } from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    recipeState: Observable<State>;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<FeatureState>) { }

    ngOnInit() {
        this.recipeState = this.store.select('recipes');
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

}
