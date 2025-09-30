import { Component, inject } from '@angular/core';
import { RandomService } from './random.service';

@Component({
  selector: 'app-ej2-consumer',
  standalone: true,
  template: `
    <section class="p-4 border rounded-md">
      <h2 class="text-lg font-semibold">Consumidor</h2>
      <p class="mt-2 text-neutral-700">Comparte el valor actual del servicio:</p>
      <p class="mt-1 text-2xl">{{ service.lastNumber() ?? '—' }}</p>
    </section>
  `
})
export class Ej2ConsumerComponent {
  readonly service = inject<RandomService>(RandomService);
}


