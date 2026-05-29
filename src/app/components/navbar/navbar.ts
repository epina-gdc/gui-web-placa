import { Component } from '@angular/core';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-navbar',
  imports: [Popover],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
