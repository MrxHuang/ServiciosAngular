import { Injectable } from '@angular/core';

export type EventName = string;
export type EventHandler<T = unknown> = (payload: T) => void;

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly map = new Map<EventName, Set<EventHandler>>();

  on<T>(event: EventName, handler: EventHandler<T>): () => void {
    if (!this.map.has(event)) this.map.set(event, new Set());
    this.map.get(event)!.add(handler as EventHandler);
    return () => this.off(event, handler);
  }

  off<T>(event: EventName, handler: EventHandler<T>) {
    this.map.get(event)?.delete(handler as EventHandler);
  }

  emit<T>(event: EventName, payload: T): void {
    const handlers = this.map.get(event);
    if (!handlers) return;
    handlers.forEach(h => {
      try { h(payload); } catch { /* noop */ }
    });
  }
}


 