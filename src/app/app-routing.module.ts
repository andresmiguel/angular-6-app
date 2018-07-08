import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard.service";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' } 
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }