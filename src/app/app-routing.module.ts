import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChangeUsernameComponent } from './pages/change-username/change-username.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgotUsernameOrPasswordComponent } from './pages/forgot-username-or-password/forgot-username-or-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'change-username', component: ChangeUsernameComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-username-or-password', component: ForgotUsernameOrPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
