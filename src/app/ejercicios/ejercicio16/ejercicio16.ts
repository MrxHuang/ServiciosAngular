import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversionService, LengthUnit, AngleUnit } from './conversion.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio16',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio16.html',
  styleUrls: ['./ejercicio16.css']
})
export class Ejercicio16 {
  private readonly svc = inject(ConversionService);

  // Longitud
  valor = signal<number>(1);
  desde = signal<LengthUnit>('m');
  hacia = signal<LengthUnit>('km');
  convertido = computed(() => this.svc.length(Number(this.valor()), this.desde(), this.hacia()));

  // Ángulo
  angValor = signal<number>(180);
  angDesde = signal<AngleUnit>('deg');
  angHacia = signal<AngleUnit>('rad');
  angConvertido = computed(() => this.svc.angle(Number(this.angValor()), this.angDesde(), this.angHacia()));
}


