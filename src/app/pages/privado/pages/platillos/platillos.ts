import { Component } from '@angular/core';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';

@Component({
  selector: 'app-platillos',
  imports: [SeccionTitulos, SeccionBusqueda],
  templateUrl: './platillos.html',
  styleUrl: './platillos.scss',
})
export class Platillos {}
