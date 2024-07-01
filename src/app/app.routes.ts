import { Routes } from '@angular/router';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { CocktailDetailsComponent } from './components/cocktail-details/cocktail-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cocktails',
        pathMatch: 'full'
    },
    {
        path: 'cocktails',
        component: CocktailsComponent
    },
    {
        path: 'cocktails/:cocktailId',
        component: CocktailDetailsComponent
    }
];
