import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavControlService } from '../estructura/nav/nav-control.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private readonly nav = inject(NavControlService);

  abrirNav(): void {
    this.nav.openSidebar();
  }
}


