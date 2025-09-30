import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemaService } from './tema.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio7',
  standalone: true,
  imports: [CommonModule, Next],
  templateUrl: './ejercicio7.html',
  styleUrl: './ejercicio7.css',
  providers: [TemaService]
})
export class Ejercicio7 {
  private readonly temaSvc = inject(TemaService);
  temaActual = computed(() => this.temaSvc.tema());

  toggleTema() {
    this.temaSvc.toggle();
  }
}
