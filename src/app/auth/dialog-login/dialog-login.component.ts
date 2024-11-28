import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { catchError, map, Observable, of } from 'rxjs';

interface ILoginForm {
  nickname: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLoginComponent {
  public loginForm: FormGroup = new FormGroup<ILoginForm>({
    nickname: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  public loginError: boolean = false;
  readonly dialogRef = inject(MatDialogRef<DialogLoginComponent>);

  constructor(private authService: AuthService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(
        map((result) => {
          this.dialogRef.close();
        }),
        catchError((error) => {
          this.loginError = true;
          return of(error);
        })
      ).subscribe();
    }
  }
}
