import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventBusService } from './event-bus.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio13',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio13.html',
  styleUrls: ['./ejercicio13.css']
})
export class Ejercicio13 implements OnDestroy {
  private readonly bus = inject(EventBusService);
  private unsubscribers: Array<() => void> = [];
  private suscritos = new Set<string>();

  canal = signal<string>('chat');
  mensaje = signal<string>('');
  log = signal<string[]>([]);

  constructor() {
    this.subscribir('chat');
    this.subscribir('notificaciones');
  }

  private subscribir(canal: string) {
    if (this.suscritos.has(canal)) return;
    const off = this.bus.on<string>(canal, (payload) => {
      this.log.update(l => [
        `[${new Date().toLocaleTimeString()}] ${canal}: ${payload}`,
        ...l
      ].slice(0, 50));
    });
    this.unsubscribers.push(off);
    this.suscritos.add(canal);
  }

  enviar() {
    const c = this.canal().trim();
    const m = this.mensaje().trim();
    if (!c || !m) return;
    this.subscribir(c);
    this.bus.emit<string>(c, m);
    this.mensaje.set('');
  }

  ngOnDestroy(): void {
    this.unsubscribers.forEach(u => u());
  }
}


