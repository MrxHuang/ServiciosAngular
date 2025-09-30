import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TemporizadorService {
  private intervalId: number | null = null;
  private startEpoch: number | null = null;
  private accumulatedMs = 0;

  ms = signal<number>(0);
  running = signal<boolean>(false);

  iniciar() {
    if (this.running()) return;
    this.running.set(true);
    this.startEpoch = Date.now();
    this.intervalId = window.setInterval(() => {
      const base = this.accumulatedMs;
      const delta = this.startEpoch ? (Date.now() - this.startEpoch) : 0;
      this.ms.set(base + delta);
    }, 50);
  }

  pausar() {
    if (!this.running()) return;
    this.running.set(false);
    if (this.startEpoch) {
      this.accumulatedMs += Date.now() - this.startEpoch;
    }
    this.startEpoch = null;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reiniciar() {
    this.pausar();
    this.accumulatedMs = 0;
    this.ms.set(0);
  }
}


 