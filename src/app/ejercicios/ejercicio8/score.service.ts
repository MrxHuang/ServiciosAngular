import { Injectable, signal } from '@angular/core';

export interface ScoreEntry {
  player: string;
  points: number;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class ScoreService {
  private readonly maxEntries = 10;
  private readonly storageKey = 'ej8-scores';
  scores = signal<ScoreEntry[]>([]);

  constructor() {
    this.restore();
  }

  addPoints(player: string, points: number) {
    const normalizedPlayer = player.trim() || 'Jugador';
    const newEntry: ScoreEntry = {
      player: normalizedPlayer,
      points,
      timestamp: Date.now()
    };
    const updated = [...this.scores(), newEntry]
      .sort((a, b) => b.points - a.points || a.timestamp - b.timestamp)
      .slice(0, this.maxEntries);
    this.scores.set(updated);
    this.persist();
  }

  reset() {
    this.scores.set([]);
    this.persist();
  }

  private persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.scores()));
    } catch {
      // ignore storage errors
    }
  }

  private restore() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ScoreEntry[];
      if (Array.isArray(parsed)) {
        this.scores.set(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }
}


