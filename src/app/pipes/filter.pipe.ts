import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../interfaces/cocktail.model';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(cocktails: Cocktail[], filterBy: string): Cocktail[] {
    if(!filterBy) {
      return cocktails;
    }
    return cocktails.filter((cocktail: Cocktail) => {
      return cocktail?.name?.toLowerCase().match(filterBy.toLowerCase());
    });
  }

}
