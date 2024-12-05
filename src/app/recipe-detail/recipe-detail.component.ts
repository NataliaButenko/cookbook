import { Component, DestroyRef, OnInit } from '@angular/core';
import { IRecipe, IUser } from '../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form.component';

@Component({
  selector: 'recipe-detail',
  imports: [
    CommonModule,
    RecipeFormComponent
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
  public recipe: IRecipe | undefined;
  public currentUser?: IUser;

  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.recipesService.getRecipeById$(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        this.recipe = value;
      });
    }

    this.authService.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((cUser) => {
      if(cUser) {
        this.currentUser = cUser;
      }
    });
  }

  editRecipe(recipe: IRecipe) {
    console.log("editRecipe", recipe);
  }

}
