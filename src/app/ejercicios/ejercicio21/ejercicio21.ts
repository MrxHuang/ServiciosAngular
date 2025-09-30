import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogService, NivelLog } from './log.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-ejercicio21',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, NgClass, RouterLink,],
  templateUrl: './ejercicio21.html',
  styleUrls: ['./ejercicio21.css']
})
export class Ejercicio21 {
  private readonly log = inject(LogService);

  nivel = signal<NivelLog>('info');
  mensaje = signal('');
  eventos = computed(() => this.log.get());

  emitir(): void {
    const msg = (this.mensaje() || '').trim();
    if (!msg) return;
    this.log.log(this.nivel(), msg);
    this.mensaje.set('');
  }

  simularAccion(tipo: 'login' | 'click' | 'navegar'): void {
    if (tipo === 'login') this.log.action('Usuario inició sesión', { modulo: 'auth' });
    if (tipo === 'click') this.log.action('Usuario hizo click', { target: 'boton' });
    if (tipo === 'navegar') this.log.info('Navegación a otra sección', { ruta: '/home' });
  }

  limpiar(): void { this.log.clear(); }
}


