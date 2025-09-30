import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventBusService } from './event-bus.service';

@Component({
  selector: 'app-ej13-receptor',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="border rounded p-3">
    <h3 class="font-semibold mb-2">Receptor</h3>
    <p class="text-sm text-gray-600">Último mensaje recibido:</p>
    <div class="mt-2 border rounded p-2 bg-white">{{ ultimo() || '—' }}</div>
  </div>
  `
})
export class ReceptorEj13 implements OnDestroy {
  private readonly bus = inject(EventBusService);
  private off: (() => void) | null = null;
  ultimo = signal<string>('');

  constructor() {
    this.off = this.bus.on<string>('demo', (payload) => {
      this.ultimo.set(payload);
    });
  }

  ngOnDestroy(): void {
    this.off?.();
  }
}


