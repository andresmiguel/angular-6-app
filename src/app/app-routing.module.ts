import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }