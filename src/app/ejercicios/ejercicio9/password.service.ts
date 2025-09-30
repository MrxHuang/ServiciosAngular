import { Injectable } from '@angular/core';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  warnings: string[];
}

@Injectable({ providedIn: 'root' })
export class PasswordService {
  private readonly upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly lower = 'abcdefghijklmnopqrstuvwxyz';
  private readonly nums = '0123456789';
  private readonly syms = '!@#$%^&*()-_=+[]{};:,.<>?';

  generate(options: PasswordOptions): string {
    const pools: string[] = [];
    if (options.uppercase) pools.push(this.upper);
    if (options.lowercase) pools.push(this.lower);
    if (options.numbers) pools.push(this.nums);
    if (options.symbols) pools.push(this.syms);
    if (pools.length === 0) return '';

    const ensure: string[] = [];
    if (options.uppercase) ensure.push(this.pick(this.upper));
    if (options.lowercase) ensure.push(this.pick(this.lower));
    if (options.numbers) ensure.push(this.pick(this.nums));
    if (options.symbols) ensure.push(this.pick(this.syms));

    const all = pools.join('');
    const remaining = Math.max(0, options.length - ensure.length);
    const body = Array.from({ length: remaining }, () => this.pick(all));
    const chars = [...ensure, ...body];
    return this.shuffle(chars).join('');
  }

  validate(password: string, options?: Partial<PasswordOptions>): boolean {
    if (!password || password.length < (options?.length ?? 8)) return false;
    if (options?.uppercase && !/[A-Z]/.test(password)) return false;
    if (options?.lowercase && !/[a-z]/.test(password)) return false;
    if (options?.numbers && !/\d/.test(password)) return false;
    if (options?.symbols && !/[!@#$%^&*()\-_=+\[\]{};:,.<>?]/.test(password)) return false;
    return true;
  }

  strength(password: string): PasswordStrength {
    const warnings: string[] = [];
    let score: 0 | 1 | 2 | 3 | 4 = 0;
    if (!password) return { score, warnings: ['Vacía'] };

    const len = password.length;
    const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].reduce((acc, r) => acc + (r.test(password) ? 1 : 0), 0);

    if (len >= 8) score++;
    if (len >= 12) score++;
    if (variety >= 2) score++;
    if (variety >= 3) score++;
    if (len < 8) warnings.push('Muy corta');
    if (!/[A-Z]/.test(password)) warnings.push('Sin mayúsculas');
    if (!/[a-z]/.test(password)) warnings.push('Sin minúsculas');
    if (!/\d/.test(password)) warnings.push('Sin números');
    if (!/[^A-Za-z0-9]/.test(password)) warnings.push('Sin símbolos');
    return { score: Math.min(score, 4) as 0 | 1 | 2 | 3 | 4, warnings };
  }

  private pick(pool: string): string {
    const idx = Math.floor(Math.random() * pool.length);
    return pool.charAt(idx);
  }

  private shuffle(chars: string[]): string[] {
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars;
  }
}


