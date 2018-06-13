import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;

    constructor(private recipeService: RecipeService,
            private router: Router,
            private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (data: Data) => {
                this.recipe = this.recipeService.getRecipe(+data['id']);
            }
        );
    }

    addIngredientsToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDeleteRecipe() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }
}
