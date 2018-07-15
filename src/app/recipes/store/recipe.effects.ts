import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { LOAD_RECIPES, SET_RECIPES, SAVE_RECIPES } from "./recipe.actions";
import { Recipe } from "../recipe.model";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { FeatureState, State } from "./recipe.reducers";
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class RecipeEffects {

    private readonly recipesUrl = 'https://recipe-book-277b9.firebaseio.com/recipes.json';

    @Effect()
    loadRecipes = this.actions$
        .ofType(LOAD_RECIPES)
        .pipe(
            switchMap(() => this.httpClient.get<Recipe[]>(this.recipesUrl)),
            map((recipes: Recipe[]) => {
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }                
                return {
                    type: SET_RECIPES,
                    payload: recipes
                };
            })
        );

        @Effect({dispatch: false})
        saveRequest = this.actions$
            .ofType(SAVE_RECIPES)
            .pipe(
                switchMap(() => this.store.select('recipes')),
                switchMap((recipeState: State) => {
                    return this.httpClient.put(this.recipesUrl, recipeState.recipes);
                })
            );

    constructor(
            private actions$: Actions,
            private httpClient: HttpClient,
            private store: Store<FeatureState>) { }
}