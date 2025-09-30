import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NombresService } from './nombres.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio20',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio20.html',
  styleUrls: ['./ejercicio20.css']
})
export class Ejercicio20 {
  private readonly svc = inject(NombresService);

  cantidad = signal<number>(5);
  nuevosPrefijos = signal<string>('');
  nuevosSufijos = signal<string>('');
  resultado = signal<string[]>([]);


  get lista(): string[] { return this.resultado(); }

  prefijos = computed(() => this.svc.getPrefijos());
  sufijos = computed(() => this.svc.getSufijos());

  generar(): void {
    this.resultado.set(this.svc.generar(Number(this.cantidad())));
  }

  addPrefijo(): void {
    this.svc.addPrefijo(this.nuevosPrefijos());
    this.nuevosPrefijos.set('');
  }

  addSufijo(): void {
    this.svc.addSufijo(this.nuevosSufijos());
    this.nuevosSufijos.set('');
  }
}