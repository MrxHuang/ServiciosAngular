import { Injectable, signal } from '@angular/core';

export type Tema = 'light' | 'dark';

@Injectable()
export class TemaService {
  private readonly storageKey = 'ej7-tema';
  tema = signal<Tema>('light');

  constructor() {
    const guardado = (localStorage.getItem(this.storageKey) as Tema | null);
    if (guardado === 'dark' || guardado === 'light') {
      this.tema.set(guardado);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.tema.set(prefersDark ? 'dark' : 'light');
    }
  }

  toggle() {
    const nuevo = this.tema() === 'dark' ? 'light' : 'dark';
    this.setTema(nuevo);
  }

  setTema(valor: Tema) {
    this.tema.set(valor);
    localStorage.setItem(this.storageKey, valor);
  }

}


