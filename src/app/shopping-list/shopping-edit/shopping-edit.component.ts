import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    name: string;
    amount: number;

    constructor(private slService: ShoppingListService) { }

    ngOnInit() {
    }

    onAddIngredient() {
        this.slService.addIngredient(new Ingredient(this.name, this.amount));
        this.name = "";
        this.amount = 0;
    }

}
