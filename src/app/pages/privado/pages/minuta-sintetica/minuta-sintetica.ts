import { Component } from '@angular/core';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';

@Component({
  selector: 'app-minuta-sintetica',
  imports: [SeccionTitulos, SeccionBusqueda],
  templateUrl: './minuta-sintetica.html',
  styleUrl: './minuta-sintetica.scss',
})
export class MinutaSintetica {}
