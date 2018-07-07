import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(
        private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService) {}

    storeRecipes() {
        return this.http.put('https://recipe-book-79319.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();
        this.http.get(`https://recipe-book-79319.firebaseio.com/recipes.json?auth=${token}`)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
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