import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocktail } from '../../interfaces/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  constructor(
    private http: HttpClient
  ) { }

  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>('/cockails');
  }

  getCocktailDetails(id: number): Observable<Cocktail>{
    return this.http.get<Cocktail>(`/cockails/${id}`);
  }
}
