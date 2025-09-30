import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OperacionesService } from './operaciones.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio6',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio6.html',
  styleUrl: './ejercicio6.css'
})
export class Ejercicio6 {
  numeroA: number | null = null;
  numeroB: number | null = null;
  operacion: 'sumar' | 'restar' | 'multiplicar' | 'dividir' | '' = '';
  resultado: number | null = null;
  error: string = '';
  display: string = '0';

  constructor(private readonly ops: OperacionesService) {}

  setOperacion(op: 'sumar' | 'restar' | 'multiplicar' | 'dividir') {
    this.operacion = op;
    this.error = '';
  }

  puedeCalcular(): boolean {
    if (this.numeroA === null || this.numeroB === null) return false;
    if (this.operacion === '') return false;
    if (this.operacion === 'dividir' && this.numeroB === 0) return false;
    return true;
  }

  calcular() {
    this.error = '';
    if (!this.puedeCalcular()) {
      this.error = this.operacion === 'dividir' && this.numeroB === 0
        ? 'No se puede dividir por cero'
        : 'Completa los campos y selecciona una operación';
      this.resultado = null;
      return;
    }

    const a = this.numeroA as number;
    const b = this.numeroB as number;
    try {
      switch (this.operacion) {
        case 'sumar':
          this.resultado = this.ops.sumar(a, b);
          break;
        case 'restar':
          this.resultado = this.ops.restar(a, b);
          break;
        case 'multiplicar':
          this.resultado = this.ops.multiplicar(a, b);
          break;
        case 'dividir':
          this.resultado = this.ops.dividir(a, b);
          break;
        default:
          this.resultado = null;
      }
    } catch (e: any) {
      this.error = e?.message ?? 'Error en la operación';
      this.resultado = null;
    }
  }

  limpiar() {
    this.numeroA = null;
    this.numeroB = null;
    this.operacion = '';
    this.resultado = null;
    this.error = '';
    this.display = '0';
  }

  // --- Teclado tipo calculadora ---
  appendDigit(digit: '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9') {
    if (this.display === '0') {
      this.display = digit;
    } else {
      this.display += digit;
    }
    this.actualizarNumeroDesdeDisplay();
  }

  appendDot() {
    if (!this.display.includes('.')) {
      this.display = this.display.length ? this.display + '.' : '0.';
      this.actualizarNumeroDesdeDisplay();
    }
  }

  clearAll() {
    this.numeroA = null;
    this.numeroB = null;
    this.operacion = '';
    this.resultado = null;
    this.error = '';
    this.display = '0';
  }

  setOperacionDesdeTecla(op: 'sumar' | 'restar' | 'multiplicar' | 'dividir') {
    this.error = '';
    this.actualizarNumeroDesdeDisplay();
    this.operacion = op;
    this.display = '0';
  }

  resolverDesdeTecla() {
    this.error = '';
    this.actualizarNumeroDesdeDisplay();

    if (!this.puedeCalcular()) {
      this.error = this.operacion === 'dividir' && (this.numeroB ?? 0) === 0
        ? 'No se puede dividir por cero'
        : 'Completa los campos y selecciona una operación';
      return;
    }

    this.calcular();
    if (this.resultado !== null) {
      this.display = String(this.resultado);
      this.numeroA = this.resultado;
      this.numeroB = null;
      this.operacion = '';
    }
  }

  private actualizarNumeroDesdeDisplay() {
    const valor = this.display === '.' ? 0 : Number(this.display);
    if (Number.isNaN(valor)) return;
    if (this.operacion === '') this.numeroA = valor; else this.numeroB = valor;
  }
}
