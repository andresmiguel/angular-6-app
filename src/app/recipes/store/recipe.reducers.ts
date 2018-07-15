import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";
import { SET_RECIPES, RecipeActions, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "./recipe.actions";
import { AppState } from "../../store/app.reducers";

export interface FeatureState extends AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
    
}

const initialState: State = {
    recipes: [
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
    )]
};

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case UPDATE_RECIPE:
            const idx = findIndex(action.payload.id, state.recipes);
            const recipes = [...state.recipes];
            if (idx > -1) {
                recipes[idx] = action.payload.recipe;
                recipes[idx].id = action.payload.id;   
            }
            return {
                ...state,
                recipes
            };
        case DELETE_RECIPE:
            const index = findIndex(action.payload, state.recipes);
            const oldRecipes = [...state.recipes];
            if (index > -1) {
                oldRecipes.splice(index, 1);
            }
            return {
                ...state,
                recipes: oldRecipes
            };
    }

    return state;
}

export function findIndex(id: number, recipes: Recipe[]): number {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === id) {
            return i;
        }
    }
    return -1;
}