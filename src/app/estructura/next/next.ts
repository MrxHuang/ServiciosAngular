import { Component, DestroyRef, effect, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './next.html',
  styleUrls: ['./next.css']
})
export class Next {
  private readonly router = inject(Router);

  private readonly url = signal<string>('');
  private readonly max = 21;

  actual = computed<number | null>(() => {
    const m = /\/ejercicio\/(\d+)/.exec(this.url());
    if (!m) return null;
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
  });

  siguiente = computed<number | null>(() => {
    const a = this.actual();
    if (a == null) return null;
    return a < this.max ? a + 1 : null;
  });

  link = computed<string>(() => {
    const s = this.siguiente();
    return s == null ? '/' : `/ejercicio/${s}`;
  });

  texto = computed<string>(() => (this.siguiente() == null ? 'Volver al inicio' : 'Siguiente ejercicio →'));

  constructor() {
    // Inicializa y escucha cambios de ruta
    this.url.set(this.router.url);
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.url.set(ev.urlAfterRedirects || ev.url);
      }
    });
  }
}


