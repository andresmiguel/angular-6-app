import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];
    recSrvSubscription = new Subscription();

    constructor(private recipeService: RecipeService,
            private router: Router,
            private route: ActivatedRoute) { }

    ngOnInit() {
        this.recSrvSubscription = this.recipeService.recipesChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        );
        this.recipes = this.recipeService.getRecipes();
    }

    ngOnDestroy(): void {
        this.recSrvSubscription.unsubscribe();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

}
