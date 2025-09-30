import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordService, PasswordOptions } from './password.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio9',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio9.html',
  styleUrl: './ejercicio9.css'
})
export class Ejercicio9 {
  private readonly svc = inject(PasswordService);

  options = signal<PasswordOptions>({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });

  password = signal<string>('');
  strength = computed(() => this.svc.strength(this.password()));

  generar() {
    this.password.set(this.svc.generate(this.options()));
  }

  validaActual(): boolean {
    const o = this.options();
    return this.svc.validate(this.password(), o);
  }

  setLength(value: number) {
    const length = Number(value) || 0;
    this.options.update(o => ({ ...o, length }));
  }

  setUppercase(value: boolean) {
    this.options.update(o => ({ ...o, uppercase: !!value }));
  }

  setLowercase(value: boolean) {
    this.options.update(o => ({ ...o, lowercase: !!value }));
  }

  setNumbers(value: boolean) {
    this.options.update(o => ({ ...o, numbers: !!value }));
  }

  setSymbols(value: boolean) {
    this.options.update(o => ({ ...o, symbols: !!value }));
  }
}


