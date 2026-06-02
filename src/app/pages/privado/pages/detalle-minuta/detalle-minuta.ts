import { Component } from '@angular/core';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';

@Component({
  selector: 'app-detalle-minuta',
  imports: [SeccionTitulos,SeccionBusqueda],
  templateUrl: './detalle-minuta.html',
  styleUrl: './detalle-minuta.scss',
})
export class DetalleMinuta {}
