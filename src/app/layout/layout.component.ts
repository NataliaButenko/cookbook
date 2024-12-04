import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../shared/interfaces';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../auth/dialog-login/dialog-login.component';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { DialogRegistrationComponent } from '../auth/dialog-registration/dialog-registration.component';
import { FooterComponent } from './footer/footer.component';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public links = [{link: '', label: "All recipies", visible: true}, {link: '/my-recipies', label: "My recipies", visible: false}, {link: '/selection', label: "Recipe selection", visible: true}];
  public currentUser: IUser | null = null;
  public isAuth: boolean = false;

  public opened: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(private authService: AuthService, private recipesService: RecipesService){}

  ngOnInit(): void {
    this.recipesService.getAllRecipes(); //init array of mock data recipes;
    this.authService.isAuth$.subscribe((isAuth) => {
      // console.log("isAuth", isAuth);
      this.isAuth = isAuth;
      this.links = this.links.map((item) => {
        if(item.link === '/my-recipies') {
          return {...item, visible: isAuth}
        }
        return item;
      })
    });

    this.authService.currentUser$.subscribe((cUser) => {
      // console.log("currentUser", cUser);
      this.currentUser = cUser
    })
  }

  openDialogLogin() {
    this.dialog.open(DialogLoginComponent);
  }

  openDialogRegistration() {
    this.dialog.open(DialogRegistrationComponent);
  }

  logout() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {data: {message: 'Do you really want logout?'}});
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.authService.logout();
      }
    })
  }
}
