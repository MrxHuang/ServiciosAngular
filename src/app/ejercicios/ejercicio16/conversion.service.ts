import { Injectable } from '@angular/core';

export type LengthUnit = 'm' | 'km' | 'cm' | 'mm';
export type AngleUnit = 'deg' | 'rad';

@Injectable({ providedIn: 'root' })
export class ConversionService {
  length(value: number, from: LengthUnit, to: LengthUnit): number {
    const meters = this.toMeters(value, from);
    return this.fromMeters(meters, to);
  }

  angle(value: number, from: AngleUnit, to: AngleUnit): number {
    if (from === to) return value;
    if (from === 'deg' && to === 'rad') return (value * Math.PI) / 180;
    if (from === 'rad' && to === 'deg') return (value * 180) / Math.PI;
    return value;
  }

  private toMeters(value: number, unit: LengthUnit): number {
    switch (unit) {
      case 'km': return value * 1000;
      case 'cm': return value / 100;
      case 'mm': return value / 1000;
      default: return value;
    }
  }

  private fromMeters(value: number, unit: LengthUnit): number {
    switch (unit) {
      case 'km': return value / 1000;
      case 'cm': return value * 100;
      case 'mm': return value * 1000;
      default: return value;
    }
  }
}


