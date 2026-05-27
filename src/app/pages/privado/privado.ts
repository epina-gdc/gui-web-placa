import { Component } from '@angular/core';
import { Menu } from '@components/menu/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-privado',
  imports: [Menu, RouterOutlet],
  templateUrl: './privado.html',
  styleUrl: './privado.scss',
})
export class Privado {}
