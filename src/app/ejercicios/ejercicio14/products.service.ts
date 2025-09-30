import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: 'tecnologia' | 'hogar' | 'deporte' | 'moda' | 'otros';
  price: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly data: Product[] = [
    { id: 'p1', name: 'Auriculares Bluetooth', category: 'tecnologia', price: 39.9 },
    { id: 'p2', name: 'Teclado mecánico', category: 'tecnologia', price: 79.0 },
    { id: 'p3', name: 'Cafetera', category: 'hogar', price: 55.5 },
    { id: 'p4', name: 'Zapatillas running', category: 'deporte', price: 60.0 },
    { id: 'p5', name: 'Camiseta básica', category: 'moda', price: 12.0 },
    { id: 'p6', name: 'Sartén antiadherente', category: 'hogar', price: 25.0 },
    { id: 'p7', name: 'Mochila urbana', category: 'moda', price: 35.0 },
    { id: 'p8', name: 'Balón de fútbol', category: 'deporte', price: 18.0 },
    { id: 'p9', name: 'Adaptador USB-C', category: 'tecnologia', price: 9.9 },
    { id: 'p10', name: 'Juego de mesa', category: 'otros', price: 29.9 }
  ];

  getAll(): Product[] {
    return [...this.data];
  }

  getCategories(): Array<Product['category']> {
    return ['tecnologia', 'hogar', 'deporte', 'moda', 'otros'];
  }

  filterByCategory(category: Product['category'] | 'todas'): Product[] {
    if (category === 'todas') return this.getAll();
    return this.data.filter(p => p.category === category);
  }

  searchByName(q: string, base?: Product[]): Product[] {
    const list = base ?? this.data;
    const query = q.trim().toLowerCase();
    if (!query) return [...list];
    return list.filter(p => p.name.toLowerCase().includes(query));
  }
}


