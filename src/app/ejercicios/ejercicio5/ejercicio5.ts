import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrasesService } from './frases.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio5',
  standalone: true,
  imports: [CommonModule, Next],
  templateUrl: './ejercicio5.html',
  styleUrl: './ejercicio5.css'
})
export class Ejercicio5 {
  private readonly frases = inject(FrasesService);
  fraseActual = this.frases.obtenerAleatoria();

  nuevaFrase(): void {
    this.fraseActual = this.frases.obtenerAleatoria();
  }
}
