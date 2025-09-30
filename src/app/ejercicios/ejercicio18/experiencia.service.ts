import { Injectable, signal, computed } from '@angular/core';

export type Rango = 'Novato' | 'Aprendiz' | 'Intermedio' | 'Avanzado' | 'Experto' | 'Maestro';

@Injectable({ providedIn: 'root' })
export class ExperienciaService {
  private readonly experienciaActual = signal<number>(0);

  nivel = computed(() => this.calcularNivel(this.experienciaActual()));
  siguienteNivelXP = computed(() => this.xpParaNivel(this.nivel() + 1));
  progresoNivel = computed(() => {
    const xp = this.experienciaActual();
    const nivelActual = this.nivel();
    const xpActualNivel = this.xpParaNivel(nivelActual);
    const xpSiguienteNivel = this.xpParaNivel(nivelActual + 1);
    const rango = xpSiguienteNivel - xpActualNivel;
    const avance = Math.max(0, Math.min(1, (xp - xpActualNivel) / rango));
    return Number((avance * 100).toFixed(2));
  });

  rango = computed<Rango>(() => {
    const lvl = this.nivel();
    if (lvl < 5) return 'Novato';
    if (lvl < 10) return 'Aprendiz';
    if (lvl < 15) return 'Intermedio';
    if (lvl < 20) return 'Avanzado';
    if (lvl < 30) return 'Experto';
    return 'Maestro';
  });

  getXP(): number { return this.experienciaActual(); }

  addXP(cantidad: number): void {
    const suma = Math.max(0, Math.floor(cantidad || 0));
    this.experienciaActual.update(v => v + suma);
  }

  reset(): void {
    this.experienciaActual.set(0);
  }

  // Curva XP: cuadrática ligera xp(n) = base * n^2 + step * n
  private xpParaNivel(nivel: number): number {
    const n = Math.max(0, Math.floor(nivel));
    const base = 25; // impacto cuadrático
    const step = 75; // impacto lineal
    return base * n * n + step * n; // 0, 100, 300, 600, 1000, ...
  }

  private calcularNivel(xp: number): number {
    // Aproximación inversa de la cuadrática: base*n^2 + step*n - xp = 0
    const base = 25;
    const step = 75;
    const a = base;
    const b = step;
    const c = -xp;
    const disc = b * b - 4 * a * c;
    const n = Math.floor((-b + Math.sqrt(Math.max(disc, 0))) / (2 * a));
    return Math.max(0, n);
  }
}


