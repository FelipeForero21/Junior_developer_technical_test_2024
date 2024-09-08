import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from './form-modal/form-modal.component';
import { CorralsListModalComponent } from './corrals-list-modal/corrals-list-modal.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Farm Management';

  constructor(public dialog: MatDialog) {}

  openFormModal(): void {
    this.dialog.open(FormModalComponent);
  }

  openCorralsListModal(): void {
    this.dialog.open(CorralsListModalComponent, {
      width: '600px'
    }).afterClosed().subscribe(() => {
      console.log('Modal de lista de corrales cerrado');
    });
  }


  openCreateAnimal(): void {
    this.dialog.open(CreateAnimalComponent, {
      width: '600px'
    }).afterClosed().subscribe(() => {
      console.log('Modal de creación de animales cerrado');
    });
  }

  }

