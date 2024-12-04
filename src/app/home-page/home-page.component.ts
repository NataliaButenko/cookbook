import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../shared/interfaces';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule
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
}
