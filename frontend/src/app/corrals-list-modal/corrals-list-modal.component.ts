import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import axios from 'axios';

@Component({
  selector: 'app-corrals-list-modal',
  templateUrl: './corrals-list-modal.component.html',
  styleUrls: ['./corrals-list-modal.component.css'],
})
export class CorralsListModalComponent {
  corrals: any[] = [];
  filteredCorrals: any[] = [];
  loading = true;
  error: string | null = null;
  averageAgeByCorral: { [key: number]: number | null } = {};
  selectedCorralId: number | null = null;
  showCorrals = false;
  animalsInSelectedCorral: any[] = [];
  visibleAverageAge: { [key: number]: boolean } = {};
  visibleAnimals: { [key: number]: boolean } = {};

  constructor(public dialogRef: MatDialogRef<CorralsListModalComponent>) {
    this.loadCorrals();
  }

  async loadCorrals() {
    try {
      const response = await axios.get('http://localhost:3000/corrals');
      this.corrals = response.data;
      this.filteredCorrals = [];
    } catch (err) {
      this.error = 'Error al cargar los corrales.';
    } finally {
      this.loading = false;
    }
  }

  async getAverageAge(corralId: number) {
    try {
      const response = await axios.get(
        `http://localhost:3000/animals/average-age/${corralId}`,
      );
      this.averageAgeByCorral[corralId] = response.data;
    } catch (err) {
      console.error(
        `Error al obtener la edad promedio para el corral ${corralId}`,
        err,
      );
      this.averageAgeByCorral[corralId] = null;
    }
  }

  async getAnimals(corralId: number) {
    try {
      const response = await axios.get(
        `http://localhost:3000/animals/${corralId}/summary`,
      );
      this.animalsInSelectedCorral = response.data.animals;
    } catch (err) {
      console.error(
        `Error al obtener los animales para el corral ${corralId}`,
        err,
      );
      this.animalsInSelectedCorral = [];
    }
  }

  toggleAverageAge(corralId: number) {
    if (!this.visibleAverageAge[corralId]) {
      this.getAverageAge(corralId);
    }
    this.visibleAverageAge[corralId] = !this.visibleAverageAge[corralId];
  }

  isAverageAgeVisible(corralId: number): boolean {
    return this.visibleAverageAge[corralId] === true;
  }

  toggleAnimals(corralId: number) {
    if (!this.visibleAnimals[corralId]) {
      this.getAnimals(corralId);
    }
    this.visibleAnimals[corralId] = !this.visibleAnimals[corralId];
  }

  isAnimalsVisible(corralId: number): boolean {
    return this.visibleAnimals[corralId] === true;
  }

  onCorralChange(selectedId: number | null) {
    this.selectedCorralId = selectedId;
    if (this.selectedCorralId === null) {
      this.filteredCorrals = this.corrals;
    } else {
      this.filteredCorrals = this.corrals.filter(
        (corral) => corral.id === this.selectedCorralId,
      );
    }
  }

  onShowCorrals() {
    this.showCorrals = true;
    this.onCorralChange(this.selectedCorralId);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
