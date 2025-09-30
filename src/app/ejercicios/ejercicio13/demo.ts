import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmisorEj13 } from './emisor';
import { ReceptorEj13 } from './receptor';

@Component({
  selector: 'app-ejercicio13-demo',
  standalone: true,
  imports: [CommonModule, EmisorEj13, ReceptorEj13],
  template: `
  <section class="mx-auto max-w-md p-4">
    <h1 class="text-2xl font-semibold">Demo Ejercicio 13</h1>
    <p class="mt-2 text-neutral-700">Envía desde el emisor y observa en el receptor.</p>
    <div class="mt-4 grid grid-cols-1 gap-3">
      <app-ej13-emisor />
      <app-ej13-receptor />
    </div>
  </section>
  `
})
export class Ejercicio13Demo {}


