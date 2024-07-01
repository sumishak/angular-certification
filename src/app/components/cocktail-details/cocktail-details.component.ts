import { Component, Input } from '@angular/core';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { Cocktail } from '../../interfaces/cocktail.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent {
  @Input() cocktailId: number;
  cocktailDetails: Cocktail;
  favoriteList: Cocktail[] = [];

  constructor(
    private cocktailService: CocktailService,
    private cacheService: CacheService,
    private router: Router
  ) {
  }
  ngOnInit() {
    this.getFavoriteCocktails();
    this.getCocktailDetails(this.cocktailId);
  }

  getFavoriteCocktails() {
    this.favoriteList =  this.cacheService.getFavoriteList();
  }

  getCocktailDetails(cocktailId: number) {
    this.cocktailService.getCocktailDetails(cocktailId)
    .subscribe({
      next: res => {
        this.cocktailDetails = res || [];
        if(this.favoriteList.length) {
          this.cocktailDetails.favorite = this.favoriteList.find(({ id }) => id === this.cocktailDetails.id)?.favorite;
          }
      }
    })
  }

  favorite(item: Cocktail) {
    item.favorite = item.favorite ? !item.favorite : true;
    if(item.favorite) {
      this.favoriteList.push(item);
    } else {
      this.favoriteList.splice(this.favoriteList.indexOf(this.favoriteList.find(({ id }) => id === item.id)!),1);
    }
    this.cacheService.setFavoriteList(this.favoriteList);
  }

  backHome() {
    this.router.navigateByUrl(`cocktails`)
  }
}
