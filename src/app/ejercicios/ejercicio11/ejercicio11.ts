import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritosService } from './favoritos.service'; 
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio11',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio11.html',
  styleUrl: './ejercicio11.css'
})
export class Ejercicio11 {
  private readonly svc = inject(FavoritosService);

  titulo = signal<string>('');
  tipo = signal<'pelicula' | 'libro' | 'serie' | 'otro'>('pelicula');
  lista = computed(() => this.svc.lista());

  agregar() {
    const t = this.titulo().trim();
    if (!t) return;
    this.svc.add({ titulo: t, tipo: this.tipo() });
    this.titulo.set('');
  }

  eliminar(id: string) { this.svc.remove(id); }
  limpiar() { this.svc.clear(); }
}


