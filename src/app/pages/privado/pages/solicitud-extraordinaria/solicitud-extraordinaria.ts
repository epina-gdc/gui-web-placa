import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaNuevaSolicitud } from '@components/tablas/tabla-nueva-solicitud/tabla-nueva-solicitud';
import { Solicitud } from '@core/models/solicitud.interface';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';

@Component({
  selector: 'app-solicitud-extraordinaria',
  imports: [TablaNuevaSolicitud, CommonModule, SeccionTitulos],
  templateUrl: './solicitud-extraordinaria.html',
  styleUrl: './solicitud-extraordinaria.scss',
})
export class SolicitudExtraordinaria {
  solicitud: Solicitud = {
    idSolicitud: 1,
    folio: '001001001',
    fecha: new Date('2026-04-10'),
    estatus: 'Pendiente',
    fechaActualizacion: new Date('2026-04-10'),
    responsable: 'Juan Pérez',
    ingredientes: [
      {
        idIngrediente: 1,
        ingrediente: 'Harina',
        idPresentacion: 1,
        presentacion: 'Kilos',
        cantidad: 2,
      },
      {
        idIngrediente: 2,
        ingrediente: 'Azúcar',
        idPresentacion: 2,
        presentacion: 'Kilos',
        cantidad: 1,
      },
      {
        idIngrediente: 3,
        ingrediente: 'Levadura',
        idPresentacion: 3,
        presentacion: 'Kilos',
        cantidad: 3,
      },
      {
        idIngrediente: 4,
        ingrediente: 'Sal',
        idPresentacion: 4,
        presentacion: 'Kilos',
        cantidad: 1,
      },
      {
        idIngrediente: 5,
        ingrediente: 'Agua',
        idPresentacion: 5,
        presentacion: 'Litros',
        cantidad: 1,
      },
      {
        idIngrediente: 6,
        ingrediente: 'Aceite',
        idPresentacion: 6,
        presentacion: 'Litros',
        cantidad: 2,
      },
      {
        idIngrediente: 7,
        ingrediente: 'Manteca',
        idPresentacion: 7,
        presentacion: 'Kilos',
        cantidad: 1,
      },
      {
        idIngrediente: 8,
        ingrediente: 'Huevos',
        idPresentacion: 8,
        presentacion: 'Kilos',
        cantidad: 1,
      },
      {
        idIngrediente: 9,
        ingrediente: 'Leche',
        idPresentacion: 9,
        presentacion: 'Litros',
        cantidad: 1,
      },
      {
        idIngrediente: 10,
        ingrediente: 'Vainilla',
        idPresentacion: 10,
        presentacion: 'gramos',
        cantidad: 1,
      },
      {
        idIngrediente: 11,
        ingrediente: 'Cacao',
        idPresentacion: 11,
        presentacion: 'gramos',
        cantidad: 1,
      },
      {
        idIngrediente: 12,
        ingrediente: 'Frutas secas',
        idPresentacion: 12,
        presentacion: 'Kilos',
        cantidad: 1,
      },
    ],
  };

  regresar() {
    window.history.back();
  }
}
