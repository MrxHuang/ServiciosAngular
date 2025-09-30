import { Injectable, signal } from '@angular/core';

export interface Favorito {
  id: string;
  titulo: string;
  tipo: 'pelicula' | 'libro' | 'serie' | 'otro';
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly storageKey = 'ej11-favs';
  lista = signal<Favorito[]>([]);

  constructor() {
    this.restore();
  }

  add(item: Omit<Favorito, 'id'>) {
    const id = cryptoRandomId();
    const nuevo: Favorito = { id, ...item };
    this.lista.set([...this.lista(), nuevo]);
    this.persist();
  }

  remove(id: string) {
    this.lista.set(this.lista().filter(f => f.id !== id));
    this.persist();
  }

  clear() {
    this.lista.set([]);
    this.persist();
  }

  private persist() {
    try { localStorage.setItem(this.storageKey, JSON.stringify(this.lista())); } catch {}
  }

  private restore() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Favorito[];
      if (Array.isArray(parsed)) this.lista.set(parsed);
    } catch {}
  }
}

function cryptoRandomId(): string {
  try {
    const arr = new Uint8Array(8);
    crypto.getRandomValues(arr);
    return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return Math.random().toString(16).slice(2);
  }
}


