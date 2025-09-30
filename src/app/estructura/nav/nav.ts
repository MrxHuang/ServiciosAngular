import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { NavControlService } from './nav-control.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './nav.html'
})
export class Nav {
  protected readonly ejercicios = Array.from({ length: 21 }).map((_, i) => ({
    id: i + 1,
    titulo: `Ejercicio ${i + 1}`
  }));

  private isDropdownOpen = signal(false);
  private isMobileOpen = signal(false);
  protected readonly isSidebarOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly ejerciciosFiltrados = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.ejercicios;
    return this.ejercicios.filter(e => e.titulo.toLowerCase().includes(q) || String(e.id).includes(q));
  });

  constructor() {
    const navControl = inject(NavControlService);
    effect(() => {
      // Reacciona a solicitudes externas de apertura
      navControl.requestOpen();
      this.openSidebar();
    });
  }

  isOpen(): boolean {
    return this.isDropdownOpen();
  }

  openDropdown(): void {
    this.isDropdownOpen.set(true);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  mobileOpen(): boolean {
    return this.isMobileOpen();
  }

  toggleMobile(): void {
    this.isMobileOpen.update(v => !v);
  }

  openSidebar(): void {
    this.isSidebarOpen.set(true);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
