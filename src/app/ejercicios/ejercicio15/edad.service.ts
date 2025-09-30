import { Injectable } from '@angular/core';

export interface AgeResult {
  years: number;
  months: number;
  days: number;
}

@Injectable({ providedIn: 'root' })
export class EdadService {
  calcularEdad(fechaNacimiento: Date | string): AgeResult | null {
    const birth = new Date(fechaNacimiento);
    if (isNaN(birth.getTime())) return null;

    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    return { years, months, days };
  }
}


