import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OperacionesService {
  sumar(a: number, b: number): number {
    return a + b;
  }

  restar(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    if (b === 0) throw new Error('División por cero');
    return a / b;
  }
}


