import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@components/footer-placa/footer';
import { Alerta } from '@components/alerta/alerta';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Alerta],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('gui-web-placa');
}
