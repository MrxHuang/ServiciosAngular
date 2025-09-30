import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialService } from './historial.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio10',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio10.html',
  styleUrl: './ejercicio10.css'
})
export class Ejercicio10 {
  private readonly svc = inject(HistorialService);
  url = signal<string>('');
  lista = computed(() => this.svc.stack());
  indice = computed(() => this.svc.index());
  actual = computed(() => this.svc.current());

  visitar() {
    this.svc.visit(this.url());
    this.url.set('');
  }

  back() { this.svc.back(); }
  forward() { this.svc.forward(); }
  reset() { this.svc.reset(); }
}


