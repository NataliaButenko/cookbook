import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { map, catchError, of, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../../shared/interfaces';

interface IRegistrationForm {
  name: FormControl<string | null>;
  nickname: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-dialog-registration',
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
  templateUrl: './dialog-registration.component.html',
  styleUrl: './dialog-registration.component.scss'
})
export class DialogRegistrationComponent {
  public registrationForm: FormGroup = new FormGroup<IRegistrationForm>({
    nickname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      this.passwordMatchValidator.bind(this),
    ]),
  });
  public errorMessage: string = '';
  readonly dialogRef = inject(MatDialogRef<DialogLoginComponent>);

  constructor(private authService: AuthService) {}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.registrationForm?.controls['password'];
    const confirmPassword = control;
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  registration(): void {
    if (this.registrationForm.valid) {
      console.log("this.registrationForm.value", this.registrationForm?.value);
      console.log("this.registrationForm?.get['nickname']", this.registrationForm?.get('nickname'));
      let user: IUser = {
        name: this.registrationForm?.get('name')?.value,
        nickName: this.registrationForm?.get('nickname')?.value,
        email: this.registrationForm?.get('email')?.value,
        isAdmin: false
      }
      this.authService.refistration(user).pipe(
         map((result) => {
          console.log("result--", result);
          this.dialogRef.close();
        }),
        catchError((error) => {
          this.errorMessage = error;
          return of(error);
        })
      ).subscribe();
    //   this.authService.login(this.loginForm.value).pipe(
    //     map((result) => {
    //       this.dialogRef.close();
    //     }),
    //     catchError((error) => {
    //       this.registrationError = true;
    //       return of(error);
    //     })
    //   ).subscribe();
    }
  }
}
