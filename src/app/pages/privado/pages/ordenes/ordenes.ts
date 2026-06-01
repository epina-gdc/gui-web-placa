import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Anio } from '@core/models/anio.interface';
import { Ooad } from '@core/models/ooad.interface';
import { Periodo } from '@core/models/periodo.interface';
import { Servicio } from '@core/models/servicio.interface';
import { TipoReporte } from '@core/models/tipo-reporte.interface';
import { Unidad } from '@core/models/unidad.interface';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TipoOrden } from '@core/models/orden.interface';

@Component({
  selector: 'app-ordenes',
  imports: [ReactiveFormsModule, SelectModule, ButtonModule, CommonModule,DatePickerModule, RadioButtonModule],
  templateUrl: './ordenes.html',
  styleUrl: './ordenes.scss',
})
export class Ordenes {
filtroForm!: FormGroup;
fb: FormBuilder = inject(FormBuilder);
  
tiposOrdenes: TipoOrden[] = [
    {
      idTipoOrden: 1,
      desTipoOrden: "Órden de compra"
    },
    {
      idTipoOrden: 2,
      desTipoOrden: "Requisición interna"
    }
  ];

  ooads: Ooad[] = [
    {
      idOoad: 1,
      desOoad: "OOAD 1"
    },
    {
      idOoad: 2,
      desOoad: "OOAD 2"
    }
  ];

  unidades: Unidad[] = [
    {
      idUnidad: 1,
      desUnidad: "Unidad 1"
    },
    {
      idUnidad: 2,
      desUnidad: "Unidad 2"
    }
  ];

  servicios:Servicio[] = [
    {
      idServicio: 1,
      desServicio: "Servicio 1"
    },
    {
      idServicio: 2,
      desServicio: "Servicio 2"
    }
  ];
  years:Anio[] = [
    {
      idAnio: 2022,
      desAnio: "2022"
    },
    {
      idAnio: 2023,
      desAnio: "2023"
    }
  ];
  periodos:Periodo[] = [
    {
      idPeriodo: 1,
      desPeriodo: "Periodo 1"
    },
    {
      idPeriodo: 2,
      desPeriodo: "Periodo 2"
    }
  ];
  constructor() {
    this.filtroForm = this.fb.group({
      tipoOrden: [null],
      ooad: [null],
      unidad: [null],
      servicio: [null],
      anio: [null],
      periodo: [null],
      fecha: [null],
      formato: [null]
    });
   }
   generarReporte(): void {

  console.log('Generar reporte');

}

}
