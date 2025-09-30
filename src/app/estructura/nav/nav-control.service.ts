import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavControlService {
  readonly requestOpen = signal(0);

  openSidebar(): void {
    this.requestOpen.update(v => v + 1);
  }
}


