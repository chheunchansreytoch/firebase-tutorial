import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstModuleRoutingModule } from './first-module-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
   HomePageComponent,
   ContactPageComponent,
   LoginPageComponent,
   SignupPageComponent,
   AddUserPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FirstModuleRoutingModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatSliderModule,
    MatButtonToggleModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ]
})
export class FirstModuleModule { }
