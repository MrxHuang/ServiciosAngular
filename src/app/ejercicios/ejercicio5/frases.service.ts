import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FrasesService {
  private readonly frases = [
    'Cree en ti y todo será posible.',
    'Cada día es una nueva oportunidad.',
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'La disciplina vence al talento cuando el talento no se disciplina.',
    'No cuentes los días, haz que los días cuenten.',
    'El mejor momento para empezar fue ayer. El segundo mejor es ahora.',
    'Tu única limitación es tu mente.',
    'Las grandes cosas nunca vienen de zonas de confort.'
    
  ];

  obtenerAleatoria(): string {
    const i = Math.floor(Math.random() * this.frases.length);
    return this.frases[i];
  }
}


