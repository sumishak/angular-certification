import { Component } from '@angular/core';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { Cocktail } from '../../interfaces/cocktail.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { RouterModule } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-cocktails',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, RouterModule],
  templateUrl: './cocktails.component.html',
  styleUrl: './cocktails.component.scss'
})
export class CocktailsComponent {

  cocktailList: Cocktail[] = [];
  favoriteList: Cocktail[] = [];
  filterCocktail: string;

  constructor(
    private cocktailService: CocktailService,
    private cacheService: CacheService
  ) {
  }
  ngOnInit() {
    this.getFavoriteCocktails();  
    this.getCocktails();
  }

  getFavoriteCocktails() {
    this.favoriteList =  this.cacheService.getFavoriteList();
  }

  getCocktails() {
    this.cocktailService.getCocktails()
      .subscribe({
        next: res =>  {
          this.cocktailList = res!;
          this.cocktailList.map(item => {
            item.ingredientsUi = item.ingredients?.join(' | ');
            if(this.favoriteList.length) {
              item.favorite = this.favoriteList.find(({ id }) => id === item.id)?.favorite;
            }
          })
        }
      });
  }

  favorite(item: Cocktail) {
    item.favorite = item.favorite ? !item.favorite : true;
    if(item.favorite) {
      this.favoriteList.push(item);
    } else{
      this.favoriteList.splice(this.favoriteList.findIndex(({ id }) => id === item.id),1);
    }
    this.cacheService.setFavoriteList(this.favoriteList)
  }

}
