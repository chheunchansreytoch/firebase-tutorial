import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: '',  redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'add-user', component: AddUserPageComponent},
  { path: 'home-page', component: HomePageComponent },
  { path: 'contact-us', component: ContactPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstModuleRoutingModule { }
