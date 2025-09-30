import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporizadorService } from './temporizador.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio12',
  standalone: true,
  imports: [CommonModule, Next],
  templateUrl: './ejercicio12.html',
  styleUrls: ['./ejercicio12.css']
})
export class Ejercicio12 {
  private readonly timer = inject(TemporizadorService);
  ms = computed(() => this.timer.ms());
  running = computed(() => this.timer.running());

  iniciar() { this.timer.iniciar(); }
  pausar() { this.timer.pausar(); }
  reiniciar() { this.timer.reiniciar(); }

  asTime(millis: number): string {
    const total = Math.floor(millis / 1000);
    const ms = millis % 1000;
    const s = total % 60;
    const m = Math.floor(total / 60) % 60;
    const h = Math.floor(total / 3600);
    const pad = (n: number, w = 2) => n.toString().padStart(w, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
  }
}


