import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@components/navbar/navbar';

@Component({
  selector: 'app-privado',
  imports: [RouterOutlet, Navbar],
  templateUrl: './privado.html',
  styleUrl: './privado.scss',
})
export class Privado {}
