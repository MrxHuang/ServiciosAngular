import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContadorService {
  private readonly _valor = signal<number>(0);
  readonly valor = this._valor.asReadonly();

  incrementar(paso: number = 1): void {
    this._valor.update(v => v + paso);
  }

  reiniciar(): void {
    this._valor.set(0);
  }
}


