import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromApp from '../store/app.reducers';
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(private store: Store<fromApp.AppState>) { }

    private recipes: Recipe[] = [
        new Recipe(
            'Boiled eggs',
            'Two eggs boiled',
            'https://elanaspantry.com/wp-content/uploads/2015/05/How-to-hard-Boil-Eggs-recipe-44081.jpg',
            [
                new Ingredient('Egg', 3)
            ]    
        ),
        new Recipe(
            'Bacon & eggs',
            'Two fried eggs with bacon',
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/11/14/1/FNM_120111-OOTB-007_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371602902394.jpeg',
            [
                new Ingredient('Egg', 2),
                new Ingredient('Bacon', 3)
            ]                
        )
    ];

    getRecipe(id: number) {
        return this.recipes.find(r => r.id === id);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    findIndex(id: number): number {
        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].id === id) {
                return i;
            }
        }

        return -1;
    }

    updateRecipe(id: number, recipe: Recipe) {
        let index = this.findIndex(id);
        if (index >= 0) {
            this.recipes[index] = recipe;
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    deleteRecipe(id: number) {
        let index = this.findIndex(id);
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(newRecipes: Recipe[]) {
        this.recipes = newRecipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}