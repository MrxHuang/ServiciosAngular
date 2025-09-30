import { Injectable } from '@angular/core';

export type SerieDeBarras = { etiqueta: string; valores: number[] };
export type SerieDeLineas = { etiqueta: string; puntos: { x: number; y: number }[] };
export type TiposDeGrafico = 'barras' | 'lineas' | 'mixto';

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  getBarras(categorias = 6, series = 2): { categorias: string[]; series: SerieDeBarras[] } {
    const etiquetas = Array.from({ length: categorias }, (_, i) => `Cat ${i + 1}`);
    const datos: SerieDeBarras[] = Array.from({ length: series }, (_, s) => ({
      etiqueta: `Serie ${s + 1}`,
      valores: etiquetas.map(() => this.randomEnRango(10, 100))
    }));
    return { categorias: etiquetas, series: datos };
  }

  getLineas(puntos = 12, series = 1): SerieDeLineas[] {
    return Array.from({ length: series }, (_, s) => ({
      etiqueta: `Serie ${s + 1}`,
      puntos: Array.from({ length: puntos }, (_, i) => ({ x: i + 1, y: this.randomEnRango(0, 100) }))
    }));
  }

  getMixto(): { categorias: string[]; barras: SerieDeBarras[]; lineas: SerieDeLineas[] } {
    const { categorias, series } = this.getBarras(8, 2);
    const lineas = this.getLineas(categorias.length, 1);
    return { categorias, barras: series, lineas };
  }

  private randomEnRango(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


