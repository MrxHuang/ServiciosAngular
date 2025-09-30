import { Component } from '@angular/core';
import { Ej2ProducerComponent } from './producer';
import { Ej2ConsumerComponent } from './consumer';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio2',
  standalone: true,
  imports: [Ej2ProducerComponent, Ej2ConsumerComponent, Next],
  templateUrl: './ejercicio2.html',
  styleUrl: './ejercicio2.css'
})
export class Ejercicio2 {

}
