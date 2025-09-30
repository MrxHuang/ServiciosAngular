import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EdadService } from './edad.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio15',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio15.html',
  styleUrl: './ejercicio15.css'
})
export class Ejercicio15 {
  private readonly svc = inject(EdadService);
  nacimiento = signal<string>('');
  resultado = computed(() => this.svc.calcularEdad(this.nacimiento()));
}


