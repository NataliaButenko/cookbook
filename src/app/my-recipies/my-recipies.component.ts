import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../shared/interfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-my-recipies',
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './my-recipies.component.html',
  styleUrl: './my-recipies.component.scss'
})
export class MyRecipiesComponent {
  public recipes: IRecipe[] = [];

  constructor(
    private authService: AuthService, 
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((cUser) => {
      if(cUser) {
        // this.recipes = this.recipesService.getRecipesByOwner(cUser.nickName);
        this.recipesService.getRecipesByOwner$(cUser.nickName).subscribe((recipes) => {
          this.recipes = recipes;
        });
      }
    });
  }
}
