import { Injectable } from '@angular/core';

export interface SeriesPoint { x: number | string; y: number; }
export interface Series { name: string; data: SeriesPoint[]; }

@Injectable({ providedIn: 'root' })
export class ChartsService {
  barras(): Series[] {
    return [
      { name: 'Ventas', data: this.range(1, 7).map(d => ({ x: `D${d}`, y: this.rand(50, 200) })) },
      { name: 'Costos', data: this.range(1, 7).map(d => ({ x: `D${d}`, y: this.rand(20, 120) })) }
    ];
  }

  lineas(): Series[] {
    return [
      { name: 'Tráfico', data: this.range(0, 11).map(m => ({ x: `M${m+1}`, y: this.rand(100, 1000) })) }
    ];
  }

  private range(start: number, count: number): number[] {
    return Array.from({ length: count }, (_, i) => start + i);
  }

  private rand(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
}

 