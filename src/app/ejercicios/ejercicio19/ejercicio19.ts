import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartDataService, SerieDeBarras, SerieDeLineas } from './chart-data.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio19',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio19.html',
  styleUrls: ['./ejercicio19.css']
})
export class Ejercicio19 {
  private readonly charts = inject(ChartDataService);

  tipo = signal<'barras' | 'lineas' | 'mixto'>('barras');
  categorias = signal<string[]>([]);
  seriesBarras = signal<SerieDeBarras[]>([]);
  seriesLineas = signal<SerieDeLineas[]>([]);

  constructor() {
    this.generar();
  }

  generar(): void {
    const t = this.tipo();
    if (t === 'barras') {
      const { categorias, series } = this.charts.getBarras();
      this.categorias.set(categorias);
      this.seriesBarras.set(series);
      this.seriesLineas.set([]);
    } else if (t === 'lineas') {
      this.categorias.set([]);
      this.seriesBarras.set([]);
      this.seriesLineas.set(this.charts.getLineas());
    } else {
      const { categorias, barras, lineas } = this.charts.getMixto();
      this.categorias.set(categorias);
      this.seriesBarras.set(barras);
      this.seriesLineas.set(lineas);
    }
  }
}


