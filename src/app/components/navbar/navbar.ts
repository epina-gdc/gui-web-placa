import { Component, signal } from '@angular/core';
import { Popover } from 'primeng/popover';
import { MenuInterno } from '@components/menu-interno/menu-interno';

@Component({
  selector: 'app-navbar',
  imports: [Popover, MenuInterno],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  menuVisible = signal<boolean>(false);
}
