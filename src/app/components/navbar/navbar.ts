import { Component, signal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { MenuInterno } from '@components/menu-interno/menu-interno';
import { AuthService } from '@core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [Popover, MenuInterno],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuVisible = signal<boolean>(false);

  constructor(private _authService: AuthService) {}

  cerrarSesion(): void {
    console.log('[InicioSesion] Solicitando cierre de sesión...');
    this._authService.cerrarSesion();
  }
}
