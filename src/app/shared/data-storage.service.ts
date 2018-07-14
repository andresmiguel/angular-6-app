import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipes() {
        return this.httpClient.put('https://recipe-book-277b9.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        this.httpClient.get<Recipe[]>('https://recipe-book-277b9.firebaseio.com/recipes.json')
        .map((recipes) => {
            for (let recipe of recipes) {
                if (!recipe['ingredients']) {
                    recipe['ingredients'] = [];
                }
            }                
            return recipes;
        })
        .subscribe((recipes: Recipe[]) => {
            return this.recipeService.setRecipes(recipes);                
        });
    }
}