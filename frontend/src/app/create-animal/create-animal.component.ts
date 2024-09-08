import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

interface Corral {
  id: number;
  name: string;
  isHighRisk: boolean;
}

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.css'],
})
export class CreateAnimalComponent implements OnInit {
  animal = {
    name: '',
    age: null,
    quantity: null,
    corralId: null,
    restrictedAnimals: [],
    isHighRisk: false,
  };

  corrals: Corral[] = [];
  error: string | null = null;
  loading = true;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateAnimalComponent>,
  ) {}
  async ngOnInit() {
    await this.loadCorrals();
  }

  async loadCorrals() {
    try {
      const response = await axios.get('http://localhost:3000/corrals');
      this.corrals = response.data;
    } catch (err) {
      this.error = 'Error al cargar los corrales.';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (
      !this.animal.name ||
      !this.animal.age ||
      !this.animal.quantity ||
      this.animal.corralId === null
    ) {
      this.error = 'Todos los campos requeridos deben ser completados.';
      this.openSnackBar(
        'Por favor completa todos los campos requeridos',
        'Cerrar',
      );
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/animals/add-to-corral',
        this.animal,
      );
      this.openSnackBar('Animal creado exitosamente', 'Cerrar');
      this.onCancel();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          this.error =
            'Error al crear el animal: No pertenece a la categoria o Corral lleno';
        } else {
          this.error = 'Error al crear el animal: ' + error.message;
        }
      } else {
        this.error = 'Error desconocido al crear el animal.';
      }
      console.error('Error:', error);
      this.openSnackBar(this.error, 'Cerrar');
    }
  }

  onCancel() {
    this.animal = {
      name: '',
      age: null,
      quantity: null,
      corralId: null,
      restrictedAnimals: [],
      isHighRisk: false,
    };
    this.error = null;
    this.dialogRef.close();
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}
