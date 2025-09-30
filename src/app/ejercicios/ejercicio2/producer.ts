import { Component, inject } from '@angular/core';
import { RandomService } from './random.service';

@Component({
  selector: 'app-ej2-producer',
  standalone: true,
  template: `
    <section class="p-4 border rounded-md">
      <h2 class="text-lg font-semibold">Productor</h2>
      <div class="mt-2 flex gap-2">
        <button class="cursor-pointer px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800 transition-colors duration-200" (click)="onGenerate()">Generar número</button>
        <span class="text-sm text-neutral-600">Último: {{ service.lastNumber() ?? '—' }}</span>
      </div>
    </section>
  `
})
export class Ej2ProducerComponent {
  readonly service = inject<RandomService>(RandomService);

  onGenerate(): void {
    this.service.generate(1, 1000);
  }
}


