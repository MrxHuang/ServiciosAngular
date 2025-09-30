import { Injectable, signal } from '@angular/core';

export type NivelLog = 'info' | 'warn' | 'error' | 'debug' | 'action';
export interface EventoLog {
  id: string;
  nivel: NivelLog;
  mensaje: string;
  timestamp: number;
  meta?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class LogService {
  private readonly eventos = signal<EventoLog[]>([]);
  private readonly maxEventos = 200;

  get(): EventoLog[] { return this.eventos(); }
  clear(): void { this.eventos.set([]); }

  private push(e: EventoLog): void {
    this.eventos.update(arr => {
      const next = [e, ...arr];
      if (next.length > this.maxEventos) next.pop();
      return next;
    });
  }

  log(nivel: NivelLog, mensaje: string, meta?: Record<string, unknown>): void {
    this.push({ id: crypto.randomUUID?.() ?? String(Date.now() + Math.random()), nivel, mensaje, timestamp: Date.now(), meta });
  }

  info(m: string, meta?: Record<string, unknown>) { this.log('info', m, meta); }
  warn(m: string, meta?: Record<string, unknown>) { this.log('warn', m, meta); }
  error(m: string, meta?: Record<string, unknown>) { this.log('error', m, meta); }
  debug(m: string, meta?: Record<string, unknown>) { this.log('debug', m, meta); }
  action(m: string, meta?: Record<string, unknown>) { this.log('action', m, meta); }
}


