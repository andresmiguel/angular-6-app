import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { State, FeatureState } from '../store/recipe.reducers';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { DeleteRecipe } from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    id: number;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<FeatureState>) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];   
                this.store.select('recipes')
                    .take(1)
                    .subscribe((recipeState: State) => {
                        this.recipe = recipeState.recipes.find(r => r.id === this.id);
                    });
            }
        );
    }

    addIngredientsToShoppingList() {
        this.store.select('recipes')
            .take(1)
            .subscribe((recipeState: State) => {
                this.store.dispatch(new AddIngredients(this.recipe.ingredients));
            });
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.store.dispatch(new DeleteRecipe(this.id));
        this.router.navigate(['/recipes']);
    }
}
