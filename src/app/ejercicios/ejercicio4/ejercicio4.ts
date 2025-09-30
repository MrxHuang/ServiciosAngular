import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TareasService, Tarea } from './tareas.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio4',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio4.html',
  styleUrl: './ejercicio4.css'
})
export class Ejercicio4 {
  tareas$!: Observable<Tarea[]>;
  nuevoTitulo = '';
  editandoId: number | null = null;
  editandoTitulo = '';

  constructor(private readonly tareasService: TareasService) {
    this.tareas$ = this.tareasService.getTareas();
  }

  agregar(): void {
    this.tareasService.crear(this.nuevoTitulo);
    this.nuevoTitulo = '';
  }

  iniciarEdicion(t: Tarea): void {
    this.editandoId = t.id;
    this.editandoTitulo = t.titulo;
  }

  guardarEdicion(): void {
    if (this.editandoId == null) return;
    this.tareasService.actualizar(this.editandoId, { titulo: this.editandoTitulo.trim() });
    this.cancelarEdicion();
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editandoTitulo = '';
  }

  toggleCompletada(id: number): void {
    this.tareasService.toggleCompletada(id);
  }

  eliminar(id: number): void {
    this.tareasService.eliminar(id);
  }

  limpiarCompletadas(): void {
    this.tareasService.limpiarCompletadas();
  }
}
