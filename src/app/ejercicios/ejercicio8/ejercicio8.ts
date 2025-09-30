import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScoreService } from './score.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio8',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio8.html',
  styleUrl: './ejercicio8.css'
})
export class Ejercicio8 {
  private readonly score = inject(ScoreService);
  jugador = signal<string>('');
  puntos = signal<number>(0);
  lista = computed(() => this.score.scores());

  agregar() {
    this.score.addPoints(this.jugador(), Number(this.puntos()));
    this.puntos.set(0);
  }

  reiniciar() {
    this.score.reset();
  }
}
