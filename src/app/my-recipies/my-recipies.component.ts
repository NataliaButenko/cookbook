import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { AuthService } from '../auth/auth.service';
import { IRecipe } from '../shared/interfaces';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TextEllepsesPipe } from '../pipes/text-ellepses.pipe';

@Component({
  selector: 'app-my-recipies',
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    MatDividerModule,
    TextEllepsesPipe,
    MatIconModule,
    RouterModule,
    MatChipsModule,
    MatTooltipModule
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
        this.recipesService.getRecipesByOwner$(cUser.nickName).subscribe((recipes) => {
          this.recipes = recipes;
        });
      }
    });
  }

  getRatinAvarage(dataArr: number[] = []): number {
    if (dataArr.length === 0) {
      return 0
    }
    const sum = dataArr.reduce((acc, curr) => acc + curr, 0);
    const average = sum / dataArr.length;
    return Math.round(average * 10) / 10;
  }
}
