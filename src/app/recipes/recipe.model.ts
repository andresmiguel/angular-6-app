import { Ingredient } from "../shared/ingredient.model";

let idCounter: number = 1;

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name:string, description: string, imagePath: string, ingredients: Ingredient[] = []) {
        this.id = idCounter++;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }

}