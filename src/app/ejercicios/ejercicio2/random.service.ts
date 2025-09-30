import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RandomService {
  private readonly _lastNumber = signal<number | null>(null);
  readonly lastNumber = this._lastNumber.asReadonly();

  generate(min = 0, max = 100): number {
    const value = Math.floor(Math.random() * (max - min + 1)) + min;
    this._lastNumber.set(value);
    return value;
  }
}


