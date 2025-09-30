import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly tareasSubject = new BehaviorSubject<Tarea[]>([
    { id: 1, titulo: 'Aprender servicios Angular', completada: false },
    { id: 2, titulo: 'Implementar CRUD en memoria', completada: true }
  ]);
  private siguienteId = 3;

  getTareas(): Observable<Tarea[]> {
    return this.tareasSubject.asObservable();
  }

  crear(titulo: string): void {
    const tituloLimpio = titulo.trim();
    if (!tituloLimpio) return;
    const nuevas = [
      ...this.tareasSubject.value,
      { id: this.siguienteId++, titulo: tituloLimpio, completada: false }
    ];
    this.tareasSubject.next(nuevas);
  }

  actualizar(id: number, cambios: Partial<Pick<Tarea, 'titulo' | 'completada'>>): void {
    const nuevas = this.tareasSubject.value.map(t =>
      t.id === id ? { ...t, ...cambios } : t
    );
    this.tareasSubject.next(nuevas);
  }

  toggleCompletada(id: number): void {
    const nuevas = this.tareasSubject.value.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    this.tareasSubject.next(nuevas);
  }

  eliminar(id: number): void {
    const nuevas = this.tareasSubject.value.filter(t => t.id !== id);
    this.tareasSubject.next(nuevas);
  }

  limpiarCompletadas(): void {
    const nuevas = this.tareasSubject.value.filter(t => !t.completada);
    this.tareasSubject.next(nuevas);
  }
}


