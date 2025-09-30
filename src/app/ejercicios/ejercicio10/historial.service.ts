import { Injectable, signal } from '@angular/core';

export interface HistoryEntry {
  url: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private readonly storageKey = 'ej10-history';
  stack = signal<HistoryEntry[]>([]);
  index = signal<number>(-1);

  constructor() {
    this.restore();
  }

  visit(url: string) {
    const cleanUrl = url.trim() || '/';
    const currentStack = this.stack();
    const newEntry: HistoryEntry = { url: cleanUrl, timestamp: Date.now() };
    const trimmed = currentStack.slice(0, this.index() + 1);
    const updated = [...trimmed, newEntry];
    this.stack.set(updated);
    this.index.set(updated.length - 1);
    this.persist();
  }

  canBack(): boolean { return this.index() > 0; }
  canForward(): boolean { return this.index() < this.stack().length - 1; }

  back() {
    if (!this.canBack()) return;
    this.index.update(i => i - 1);
    this.persist();
  }

  forward() {
    if (!this.canForward()) return;
    this.index.update(i => i + 1);
    this.persist();
  }

  current(): HistoryEntry | null {
    const i = this.index();
    const s = this.stack();
    return i >= 0 && i < s.length ? s[i] : null;
  }

  reset() {
    this.stack.set([]);
    this.index.set(-1);
    this.persist();
  }

  private persist() {
    try {
      const payload = { stack: this.stack(), index: this.index() };
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch {}
  }

  private restore() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { stack: HistoryEntry[]; index: number };
      if (Array.isArray(parsed?.stack) && typeof parsed?.index === 'number') {
        this.stack.set(parsed.stack);
        this.index.set(parsed.index);
      }
    } catch {}
  }
}


