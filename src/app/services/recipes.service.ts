import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, of } from 'rxjs';
import { IRecipe } from '../shared/interfaces';
import { HttpConnector } from './httpConector';
import { recipesList } from '../mockData/recipesList';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends AbstractService {
  public recipesSubject = new BehaviorSubject<IRecipe[]>([]);
  public recipes$ = this.recipesSubject.asObservable();
  public publickRecipes$: Observable<IRecipe[]>;

  constructor() {
    super();
    this.publickRecipes$ = this.recipesSubject.asObservable().pipe(
      map((recipes) => recipes.filter((recipe) => !recipe.private))
    );
  }

  public getData(): Observable<IRecipe[]> {
    return of(recipesList).pipe(
      delay(500),
      catchError((error: any) => {
        return this.handelError(error);
      })
    );
  }

  public getAllRecipes(): void {
    this.getData().subscribe((data) => {
      this.recipesSubject.next(data);
    });
  }

  public updateRecipes(newRecipes: IRecipe[]): void {
    this.recipesSubject.next(newRecipes);
  }

  // getRecipesByOwner(owner: string): IRecipe[] {
  //   const allRecipes = this.recipesSubject.getValue();
  //   return allRecipes.filter((recipe) => recipe.owner === owner);
  // }
  getRecipesByOwner$(owner: string): Observable<IRecipe[]> {
    return this.recipesSubject.asObservable().pipe(
      map((recipes) => recipes.filter((recipe) => recipe.owner === owner))
    );
  }
}
