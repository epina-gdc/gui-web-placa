import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TablaSolicitud } from '@components/tablas/tabla-solicitud/tabla-solicitud';
import { EstatusSolicitud } from '@core/models/estatus-solicitud.interface';
import { Solicitud } from '@core/models/solicitud.interface';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';

@Component({
  selector: 'app-solicitud-extraordinaria-proveedor',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    TablaSolicitud,
    SeccionTitulos,
    SeccionBusqueda,
  ],
  templateUrl: './solicitud-extraordinaria-proveedor.html',
  styleUrl: './solicitud-extraordinaria-proveedor.scss',
})
export class SolicitudExtraordinariaProveedor {
  filtroForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  listaEstatus: EstatusSolicitud[] = [
    { idEstatus: 1, desEstatus: 'Pendiente' },
    { idEstatus: 2, desEstatus: 'Aprobada' },
    { idEstatus: 3, desEstatus: 'Rechazada' },
  ];
  solicitudes: Solicitud[] = [
    {
      idSolicitud: 1,
      folio: '001001001',
      fecha: new Date('2026-04-10'),
      estatus: 'Pendiente',
      fechaActualizacion: new Date('2026-04-10'),
    },
    {
      idSolicitud: 2,
      folio: '001001002',
      fecha: new Date('2026-04-11'),
      estatus: 'Aprobada',
      fechaActualizacion: new Date('2026-04-11'),
    },
    {
      idSolicitud: 3,
      folio: '001001003',
      fecha: new Date('2026-04-12'),
      estatus: 'Rechazada',
      fechaActualizacion: new Date('2026-04-12'),
      motivoRechazo: 'Falta de documentación',
    },
    {
      idSolicitud: 4,
      folio: '001001004',
      fecha: new Date('2026-04-13'),
      estatus: 'Pendiente',
      fechaActualizacion: new Date('2026-04-13'),
    },
    {
      idSolicitud: 5,
      folio: '001001005',
      fecha: new Date('2026-04-14'),
      estatus: 'Aprobada',
      fechaActualizacion: new Date('2026-04-14'),
    },
    {
      idSolicitud: 6,
      folio: '001001006',
      fecha: new Date('2026-04-15'),
      estatus: 'Rechazada',
      fechaActualizacion: new Date('2026-04-15'),
      motivoRechazo: 'Información incorrecta',
    },
    {
      idSolicitud: 7,
      folio: '001001007',
      fecha: new Date('2026-04-16'),
      estatus: 'Pendiente',
      fechaActualizacion: new Date('2026-04-16'),
    },
    {
      idSolicitud: 8,
      folio: '001001008',
      fecha: new Date('2026-04-17'),
      estatus: 'Aprobada',
      fechaActualizacion: new Date('2026-04-17'),
    },
    {
      idSolicitud: 9,
      folio: '001001009',
      fecha: new Date('2026-04-18'),
      estatus: 'Rechazada',
      fechaActualizacion: new Date('2026-04-18'),
      motivoRechazo: 'No cumple con los requisitos',
    },
    {
      idSolicitud: 10,
      folio: '001001010',
      fecha: new Date('2026-04-19'),
      estatus: 'Pendiente',
      fechaActualizacion: new Date('2026-04-19'),
    },
    {
      idSolicitud: 11,
      folio: '001001011',
      fecha: new Date('2026-04-20'),
      estatus: 'Aprobada',
      fechaActualizacion: new Date('2026-04-20'),
    },
    {
      idSolicitud: 12,
      folio: '001001012',
      fecha: new Date('2026-04-21'),
      estatus: 'Rechazada',
      fechaActualizacion: new Date('2026-04-21'),
      motivoRechazo: 'Falta de información',
    },
    {
      idSolicitud: 13,
      folio: '001001013',
      fecha: new Date('2026-04-22'),
      estatus: 'Pendiente',
      fechaActualizacion: new Date('2026-04-22'),
    },
  ];
  constructor() {
    this.filtroForm = this.fb.group({
      fecha: [null],
      folio: [''],
      estatus: [null],
    });
  }
}
