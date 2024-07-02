import { Injectable } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  getFavoriteList(): Cocktail[] {
    const favCocktails: string = localStorage.getItem('favoriteCocktails') ?? '';
    if(favCocktails)
      return JSON.parse(favCocktails);
    return [];
  }

  setFavoriteList(cockails: Cocktail[]) {
    return localStorage.setItem('favoriteCocktails', JSON.stringify(cockails));
  }
}
