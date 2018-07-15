import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { LOAD_RECIPES, SET_RECIPES, SAVE_RECIPES } from "./recipe.actions";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { FeatureState, State } from "./recipe.reducers";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Injectable()
export class RecipeEffects {

    private readonly recipesUrl = 'https://recipe-book-277b9.firebaseio.com/recipes.json';

    @Effect()
    loadRecipes = this.actions$
        .ofType(LOAD_RECIPES)
        .switchMap(() => this.httpClient.get<Recipe[]>(this.recipesUrl))
        .map((recipes: Recipe[]) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }                
            return {
                type: SET_RECIPES,
                payload: recipes
            };
        });       

        @Effect({dispatch: false})
        saveRequest = this.actions$
            .ofType(SAVE_RECIPES)
            .switchMap(() => this.store.select('recipes'))
            .switchMap((recipeState: State) => {
                return this.httpClient.put(this.recipesUrl, recipeState.recipes);
            });

    constructor(
            private actions$: Actions,
            private httpClient: HttpClient,
            private store: Store<FeatureState>) { }
}