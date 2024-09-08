import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { AppComponent } from './app.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { CorralsListModalComponent } from './corrals-list-modal/corrals-list-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CreateAnimalComponent } from './create-animal/create-animal.component';


@NgModule({
  declarations: [
    AppComponent,
    FormModalComponent,
    CorralsListModalComponent,
    CreateAnimalComponent,
  ],
  imports: [
    FormsModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormModalComponent, CorralsListModalComponent]
})
export class AppModule { }
