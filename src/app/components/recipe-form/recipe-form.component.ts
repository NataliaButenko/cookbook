import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodOccasions, IIngredient, IRecipe } from '../../shared/interfaces';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface IForm {
  name: FormControl<string | null>;
}

@Component({
  selector: 'recipe-form',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe?: IRecipe;
  @Input() onSave!: (recipe: IRecipe) => void;
  
  public form: FormGroup = new FormGroup<IForm>({
    name: new FormControl('', [Validators.required]),
  });

  public recipeForm!: FormGroup;
  public foodOccasions = FoodOccasions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.recipe) {
      this.populateForm(this.recipe);
    }
  }

  private initForm() {
    this.recipeForm = this.fb.group({
      // id: [null],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      foodOccasions: [null],
      cuisine: [''],
      private: [false],
      kkal: [null, [Validators.min(0)]],
      isVegan: [false],
      imageUrl: [''],
      tags: this.fb.array([]),
      ingredients: this.fb.array([]),
    });
  }

  populateForm(recipe: IRecipe) {
    this.recipeForm.patchValue({
      // id: recipe.id,
      name: recipe.name,
      description: recipe.descriprion,
      owner: recipe.owner,
      foodOccasions: recipe.foodOccasions,
      cuisine: recipe.cuisine,
      private: recipe.private,
      kkal: recipe.kkal,
      isVegan: recipe.isVegan,
      imageUrl: recipe.imageUrl,
    });

    this.setIngredients(recipe.ingredients);
    this.setTags(recipe.tags || []);
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get tags(): FormArray {
    return this.recipeForm.get('tags') as FormArray;
  }

  setIngredients(ingredients: IIngredient[]) {
    const ingredientControls = ingredients.map((ingredient) =>
      this.fb.group({
        name: [ingredient.name, [Validators.required]],
        quantity: [ingredient.quantity, [Validators.required]],
      })
    );
  
    // Очищаем FormArray
    this.ingredients.clear();
  
    // Добавляем новые элементы
    ingredientControls.forEach((control) => this.ingredients.push(control));
  }

  setTags(tags: string[]) {
    const tagControls = tags.map((tag) => this.fb.control(tag));
  
    // Очищаем FormArray
    this.tags.clear();
  
    // Добавляем новые элементы
    tagControls.forEach((control) => this.tags.push(control));
  }

  addIngredient() {
    this.ingredients.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: ['', Validators.required],
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  submitForm() {
    if (this.recipeForm.valid) {
      this.onSave(this.recipeForm.value);
    }
  }

}
