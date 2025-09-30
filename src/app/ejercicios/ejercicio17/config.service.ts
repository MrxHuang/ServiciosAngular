import { Injectable, signal } from '@angular/core';

export type Idioma = 'es' | 'en' | 'fr';

export interface UserConfig {
  idioma: Idioma;
  tema: 'light' | 'dark' | 'system';
  notificaciones: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly storageKey = 'ej17-config';
  config = signal<UserConfig>({ idioma: 'es', tema: 'system', notificaciones: true });

  constructor() { this.restore(); }

  setIdioma(idioma: Idioma) { this.update({ idioma }); }
  setTema(tema: 'light' | 'dark' | 'system') { this.update({ tema }); }
  setNotificaciones(value: boolean) { this.update({ notificaciones: value }); }

  private update(partial: Partial<UserConfig>) {
    this.config.update(c => ({ ...c, ...partial }));
    this.persist();
  }

  private persist() {
    try { localStorage.setItem(this.storageKey, JSON.stringify(this.config())); } catch {}
  }

  private restore() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as UserConfig;
      if (parsed && typeof parsed === 'object') this.config.set(parsed);
    } catch {}
  }
}


 