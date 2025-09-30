import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventBusService } from './event-bus.service';

@Component({
  selector: 'app-ej13-emisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="border rounded p-3">
    <h3 class="font-semibold mb-2">Emisor</h3>
    <label class="flex flex-col gap-1">
      <span class="text-sm text-gray-600">Mensaje</span>
      <input type="text" class="border rounded px-2 py-1" [ngModel]="mensaje()" (ngModelChange)="mensaje.set($event)" />
    </label>
    <button class="mt-2 bg-black text-white rounded px-3 py-1 cursor-pointer hover:bg-gray-800" (click)="emitir()">Emitir</button>
  </div>
  `
})
export class EmisorEj13 {
  private readonly bus = inject(EventBusService);
  mensaje = signal<string>('Hola receptor');

  emitir() {
    const m = this.mensaje().trim();
    if (!m) return;
    this.bus.emit<string>('demo', m);
    this.mensaje.set('');
  }
}


 