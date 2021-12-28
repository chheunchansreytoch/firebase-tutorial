import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MobxAngularModule } from 'mobx-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './components/dialogs/update-dialog/update-dialog.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    DeleteDialogComponent,
    UpdateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MobxAngularModule,

    AngularFireModule.initializeApp(environment.firestore),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatSortModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
