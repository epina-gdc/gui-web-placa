import { Component, inject } from '@angular/core';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Periodo } from '@core/models/periodo.interface';
import { Anio } from '@core/models/anio.interface';
import { SeccionBusquedaMinutas } from '@components/seccion-busqueda-minutas/seccion-busqueda-minutas';
import { Minuta } from '@core/models/minuta.interface';

@Component({
  selector: 'app-minuta-sintetica',
  imports: [
    SeccionTitulos,
    SeccionBusqueda,
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    CommonModule,
    DatePickerModule,
    RadioButtonModule,
    SeccionBusquedaMinutas,
  ],
  templateUrl: './minuta-sintetica.html',
  styleUrl: './minuta-sintetica.scss',
  providers: [DatePipe],
})
export class MinutaSintetica {
  datePipe = inject(DatePipe);
  filtroForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  years: Anio[] = [
    {
      idAnio: 2022,
      desAnio: '2022',
    },
    {
      idAnio: 2023,
      desAnio: '2023',
    },
  ];
  periodos: Periodo[] = [
    {
      idPeriodo: 1,
      desPeriodo: '2 -09/02/2026 al 10/03/2026',
    },
    {
      idPeriodo: 2,
      desPeriodo: '3 -10/03/2026 al 07/04/2026',
    },
  ];
  periodoSeleccionado: string = '';
  fechaSeleccionada: string = '';
  tipoBusquedaSeleccionada: string = '';

  minuta: Minuta = {
    idMinuta: 1,
    servicios: [
      {
        servicio: { idServicio: 1, desServicio: 'Desayuno' },
        variedad: [
          { idVariedad: 1, desVariedad: 'Variedad 1', racion: 135 },
          { idVariedad: 2, desVariedad: 'Variedad 2', racion: 135 },
          { idVariedad: 3, desVariedad: 'Variedad 3', racion: 135 },
          { idVariedad: 4, desVariedad: 'Variedad 4', racion: 135 },
          { idVariedad: 5, desVariedad: 'Variedad 5', racion: 135 },
          { idVariedad: 6, desVariedad: 'Variedad 6', racion: 135 },
          { idVariedad: 7, desVariedad: 'Variedad 7', racion: 135 },
          { idVariedad: 8, desVariedad: 'Variedad 8', racion: 135 },
          { idVariedad: 9, desVariedad: 'Variedad 9', racion: 135 },
          { idVariedad: 10, desVariedad: 'Variedad 10', racion: 135 },
          { idVariedad: 11, desVariedad: 'Variedad 11', racion: 135 },
        ],
      },
      {
        servicio: { idServicio: 2, desServicio: 'Comida' },
        variedad: [
          { idVariedad: 1, desVariedad: 'Variedad 1', racion: 135 },
          { idVariedad: 2, desVariedad: 'Variedad 2', racion: 135 },
          { idVariedad: 3, desVariedad: 'Variedad 3', racion: 135 },
          { idVariedad: 4, desVariedad: 'Variedad 4', racion: 135 },
          { idVariedad: 5, desVariedad: 'Variedad 5', racion: 135 },
          { idVariedad: 6, desVariedad: 'Variedad 6', racion: 135 },
          { idVariedad: 7, desVariedad: 'Variedad 7', racion: 135 },
          { idVariedad: 8, desVariedad: 'Variedad 8', racion: 135 },
          { idVariedad: 9, desVariedad: 'Variedad 9', racion: 135 },
          { idVariedad: 10, desVariedad: 'Variedad 10', racion: 135 },
          { idVariedad: 11, desVariedad: 'Variedad 11', racion: 135 },
        ],
      },
      {
        servicio: { idServicio: 3, desServicio: 'Cena' },
        variedad: [
          { idVariedad: 1, desVariedad: 'Variedad 1', racion: 135 },
          { idVariedad: 2, desVariedad: 'Variedad 2', racion: 135 },
          { idVariedad: 3, desVariedad: 'Variedad 3', racion: 135 },
          { idVariedad: 4, desVariedad: 'Variedad 4', racion: 135 },
          { idVariedad: 5, desVariedad: 'Variedad 5', racion: 135 },
          { idVariedad: 6, desVariedad: 'Variedad 6', racion: 135 },
          { idVariedad: 7, desVariedad: 'Variedad 7', racion: 135 },
          { idVariedad: 8, desVariedad: 'Variedad 8', racion: 135 },
          { idVariedad: 9, desVariedad: 'Variedad 9', racion: 135 },
          { idVariedad: 10, desVariedad: 'Variedad 10', racion: 135 },
          { idVariedad: 11, desVariedad: 'Variedad 11', racion: 135 },
        ],
      },
    ],
  };

  constructor() {
    this.filtroForm = this.fb.group({
      tipoBusqueda: ['periodo', Validators.required],
      anio: [null],
      periodo: [null],
      fecha: [null],
    });
  }

  ngOnInit(): void {
    this.filtroForm.get('tipoBusqueda')?.valueChanges.subscribe((valor) => {
      this.limpiarBusqueda();
    });
  }

  limpiarBusqueda(): void {
    this.periodoSeleccionado = '';
    this.fechaSeleccionada = '';
    this.tipoBusquedaSeleccionada = '';
    this.filtroForm.get('anio')?.setValue(null);
    this.filtroForm.get('periodo')?.setValue(null);
    this.filtroForm.get('fecha')?.setValue(null);
  }

  get esBusquedaPeriodo(): boolean {
    return this.filtroForm.get('tipoBusqueda')?.value === 'periodo';
  }

  get esBusquedaMinuta(): boolean {
    return this.filtroForm.get('tipoBusqueda')?.value === 'minuta';
  }
  buscar(): void {
    this.periodoSeleccionado = '';
    this.fechaSeleccionada = '';
    if (this.esBusquedaPeriodo) {
      this.tipoBusquedaSeleccionada = 'periodo';
      this.periodoSeleccionado = this.descripcionPeriodo;
    } else if (this.esBusquedaMinuta) {
      this.tipoBusquedaSeleccionada = 'minuta';
      this.fechaSeleccionada =
        this.datePipe.transform(this.filtroForm.get('fecha')?.value, 'dd/MM/yyyy') ?? '';
      this.periodoSeleccionado = 'Periodo:2 Minuta:4';
    }
  }

  get descripcionPeriodo(): string {
    const idPeriodo = this.filtroForm.value.periodo;

    return this.periodos.find((x) => x.idPeriodo === idPeriodo)?.desPeriodo ?? '';
  }
}
