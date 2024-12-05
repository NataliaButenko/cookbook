import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecipe } from '../../shared/interfaces';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface IForm {
  name: FormControl<string | null>;
}

@Component({
  selector: 'recipe-form',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {
  public form: FormGroup = new FormGroup<IForm>({
    name: new FormControl('', [Validators.required]),
  });

  @Input() readonly: boolean = false;
  @Output() save = new EventEmitter<IRecipe>();

  onSubmit() {
    console.log("onSubmit")
    // this.save.next();
  }

}
