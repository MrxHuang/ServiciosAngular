import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigService, Idioma } from './config.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio17',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio17.html',
  styleUrls: ['./ejercicio17.css']
})
export class Ejercicio17 {
  private readonly cfg = inject(ConfigService);
  actual = computed(() => this.cfg.config());

  setIdioma(v: Idioma) { this.cfg.setIdioma(v); }
  setTema(v: 'light' | 'dark' | 'system') { this.cfg.setTema(v); }
  setNotificaciones(v: boolean) { this.cfg.setNotificaciones(v); }
}


