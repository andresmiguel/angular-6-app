import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredient[];
    editingIngredient: Ingredient;
    editingIngredientIndex: number;
}

const initialState: State = {
    ingredients: [],
    editingIngredient: null,
    editingIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            let ingredients = [...state.ingredients];
            ingredients[state.editingIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            let oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editingIngredientIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients
            };
        case ShoppingListActions.START_EDIT:
            const editingIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editingIngredient,
                editingIngredientIndex: action.payload
            };              
    }
    return state;
}