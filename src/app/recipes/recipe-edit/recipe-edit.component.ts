import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { State, FeatureState } from '../store/recipe.reducers';
import { UpdateRecipe, AddRecipe } from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    recipeId: number;
    editMode: boolean = false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private store: Store<FeatureState>) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.recipeId = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        );
    }

    onSubmit() {
        const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );
        if (this.editMode) {
            this.store.dispatch(new UpdateRecipe({id: this.recipeId, recipe: newRecipe}));
            this.editMode = false;
        } else {
            this.store.dispatch(new AddRecipe(newRecipe));
        }
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onCancel() {
        this.editMode = false;
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    private initForm() {
        let recipeName = '';
        let recipeImgPath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            this.store.select('recipes')
                .take(1)
                .subscribe((recipeState: State) => {
                    const recipe = recipeState.recipes.find(r => r.id === this.recipeId);;
                    recipeName = recipe.name;
                    recipeImgPath = recipe.imagePath;
                    recipeDescription = recipe.description;
                    if (recipe.ingredients) {
                        for (let ingredient of recipe.ingredients) {
                            recipeIngredients.push(new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount, [
                                    Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)
                                ])
                            }));
                        }
                    }
                });
        }
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImgPath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

}
