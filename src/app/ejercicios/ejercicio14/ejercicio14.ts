import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, Product } from './products.service';
import { Next } from '../../estructura/next/next';

@Component({
  selector: 'app-ejercicio14',
  standalone: true,
  imports: [CommonModule, FormsModule, Next],
  templateUrl: './ejercicio14.html',
  styleUrls: ['./ejercicio14.css']
})
export class Ejercicio14 {
  private readonly svc = inject(ProductsService);
  categoria = signal<'todas' | Product['category']>('todas');
  busqueda = signal<string>('');

  categorias = this.svc.getCategories();

  lista = computed(() => {
    const base = this.svc.filterByCategory(this.categoria());
    return this.svc.searchByName(this.busqueda(), base);
  });
}


