import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExperienciaService } from './experiencia.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio18',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio18.html',
  styleUrls: ['./ejercicio18.css']
})
export class Ejercicio18 {
  private readonly xp = inject(ExperienciaService);

  cantidad = signal<number>(100);
  totalXP = computed(() => this.xp.getXP());
  nivel = computed(() => this.xp.nivel());
  rango = computed(() => this.xp.rango());
  progreso = computed(() => this.xp.progresoNivel());
  siguiente = computed(() => this.xp.siguienteNivelXP());

  sumar(): void { this.xp.addXP(Number(this.cantidad())); }
  reiniciar(): void { this.xp.reset(); }
}


