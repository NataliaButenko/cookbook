import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    {
        path: 'my-recipies',
        loadComponent: async () =>
          (await import('./my-recipies/my-recipies.component')).MyRecipiesComponent,
    },
    {
        path: 'selection',
        loadComponent: async () =>
          (await import('./selection-recipies/selection-recipies.component')).SelectionRecipiesComponent,
    },
    {
        path: 'users',
        loadComponent: async () =>
          (await import('./users/users.component')).UsersComponent,
        canActivate: [authGuard],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}