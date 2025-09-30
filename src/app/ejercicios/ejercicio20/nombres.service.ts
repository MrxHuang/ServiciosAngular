import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NombresService {
  private readonly prefijos = signal<string[]>([
    'Ar', 'Bel', 'Cal', 'Dar', 'El', 'Fen', 'Gal', 'Hal', 'Ian', 'Jar', 'Ka', 'Lor', 'Mor', 'Nal', 'Or', 'Pel', 'Qui', 'Ral', 'Sel', 'Tor', 'Ul', 'Val', 'Wen', 'Xan', 'Yor', 'Zel'
  ]);
  private readonly sufijos = signal<string[]>([
    'dor', 'ion', 'iel', 'mar', 'tas', 'wen', 'ric', 'diel', 'nor', 'thas', 'lin', 'bar', 'grim', 'vash', 'zar', 'thus', 'mir', 'dora', 'el', 'iel'
  ]);

  addPrefijo(v: string): void {
    const n = (v || '').trim();
    if (!n) return;
    this.prefijos.update(arr => [...arr, n]);
  }
  addSufijo(v: string): void {
    const n = (v || '').trim();
    if (!n) return;
    this.sufijos.update(arr => [...arr, n]);
  }

  getPrefijos(): string[] { return this.prefijos(); }
  getSufijos(): string[] { return this.sufijos(); }

  generar(cantidad = 1): string[] {
    const p = this.prefijos();
    const s = this.sufijos();
    const out: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const pref = p[Math.floor(Math.random() * p.length)] ?? '';
      const suf = s[Math.floor(Math.random() * s.length)] ?? '';
      out.push(`${pref}${suf}`);
    }
    return out;
  }
}


