import { Component, inject } from '@angular/core';
import { Next } from '../../estructura/next/next';
import { ContadorService } from './contador.service';

@Component({
  selector: 'app-ejercicio3',
  standalone: true,
  imports: [Next],
  templateUrl: './ejercicio3.html',
  styleUrl: './ejercicio3.css'
})
export class Ejercicio3 {
  readonly contador = inject(ContadorService);
}
