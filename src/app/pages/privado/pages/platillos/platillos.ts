import { Component } from '@angular/core';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';

@Component({
  selector: 'app-platillos',
  imports: [SeccionTitulos],
  templateUrl: './platillos.html',
  styleUrl: './platillos.scss',
})
export class Platillos {}
