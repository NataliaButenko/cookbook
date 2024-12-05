import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../shared/interfaces';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TextEllepsesPipe } from '../pipes/text-ellepses.pipe';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule,
    TextEllepsesPipe,
    MatIconModule,
    RouterModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  public recipes: IRecipe[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.publickRecipes$.subscribe((data) => {
      this.recipes = data;
    })
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
