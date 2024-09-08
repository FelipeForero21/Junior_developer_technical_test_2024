import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Corral } from './corral.model';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar  
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      isHighRisk: [false, Validators.required] 
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const corral: Corral = this.form.value;
      try {
        const response = await axios.post<Corral>('http://localhost:3000/corrals/add', corral);
        console.log('Corral agregado:', response.data);
        this.snackBar.open('Corral creado exitosamente', 'Cerrar', {
          duration: 10000,  
        });
        this.dialogRef.close();
      } catch (error) {
        console.error('Error al agregar el corral:', error);
      }
    }
  }
}
