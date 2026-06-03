import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaNuevaSolicitud } from '@components/tablas/tabla-nueva-solicitud/tabla-nueva-solicitud';
import { IngredienteSolicitud } from '@core/models/ingrediente-solicitud.interface';
import { Ingrediente } from '@core/models/ingredientes.interface';
import { Presentacion } from '@core/models/presentacion.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-nueva-solicitud-extraordinaria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    TablaNuevaSolicitud,
    SeccionTitulos,
    SeccionBusqueda,
  ],
  templateUrl: './nueva-solicitud-extraordinaria.html',
  styleUrl: './nueva-solicitud-extraordinaria.scss',
})
export class NuevaSolicitudExtraordinaria {
  protected _alertaService: AlertService = inject(AlertService);

  filtroForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  presentaciones: Presentacion[] = [
    { idPresentacion: 1, desPresentacion: 'Lata' },
    { idPresentacion: 2, desPresentacion: 'Gramos' },
    { idPresentacion: 3, desPresentacion: 'Kilos' },
  ];
  listIngredientes: IngredienteSolicitud[] = [];

  ingredientes: Ingrediente[] = [
    { idIngrediente: 1, desIngrediente: 'Carne de res' },
    { idIngrediente: 2, desIngrediente: 'Carne de cerdo' },
    { idIngrediente: 3, desIngrediente: 'Pechuga de pollo' },
    { idIngrediente: 4, desIngrediente: 'Pescado' },
    { idIngrediente: 5, desIngrediente: 'Camarón' },
  ];

  ingredientesFiltrados: Ingrediente[] = [];
  mostrarLista: boolean = false;
  ingredienteSeleccionado = '';
  constructor() {
    this.filtroForm = this.fb.group({
      ingrediente: [null, Validators.required],

      ingredienteTexto: [''],

      presentacion: [null, Validators.required],

      cantidad: [null, Validators.required],
    });

    this.ingredientesFiltrados = [...this.ingredientes];
  }

  regresar() {
    window.history.back();
  }

  /* =========================================================
     FILTRAR
     ========================================================= */

  filtrarIngredientes(): void {
    const texto = this.filtroForm.get('ingredienteTexto')?.value?.toLowerCase()?.trim();

    if (!texto) {
      this.ingredientesFiltrados = [...this.ingredientes];

      return;
    }

    this.ingredientesFiltrados = this.ingredientes.filter((x) =>
      x.desIngrediente.toLowerCase().includes(texto),
    );
  }
  /* =========================================================
     SELECCIONAR
     ========================================================= */

  seleccionarIngrediente(ingrediente: Ingrediente): void {
    this.filtroForm.patchValue({
      ingrediente: ingrediente,
      ingredienteTexto: ingrediente.desIngrediente,
    });

    this.mostrarLista = false;
  }
  /* =========================================================
   AGREGAR INGREDIENTE
   ========================================================= */

  agregarIngrediente(): void {
    const idIngrediente = this.filtroForm.value.ingrediente;

    const idPresentacion = this.filtroForm.value.presentacion;

    const ingrediente = this.filtroForm.value.ingrediente;

    ingrediente.idIngrediente;
    ingrediente.desIngrediente;

    const presentacion = this.presentaciones.find((x) => x.idPresentacion === idPresentacion);

    if (!ingrediente || !presentacion) {
      return;
    }

    const existe = this.listIngredientes.some(
      (x) => x.idIngrediente === idIngrediente && x.idPresentacion === idPresentacion,
    );

    if (existe) {
      return;
    }

    this.listIngredientes.push({
      idIngrediente: ingrediente.idIngrediente,
      ingrediente: ingrediente.desIngrediente,

      idPresentacion: presentacion.idPresentacion,
      presentacion: presentacion.desPresentacion,
      cantidad: this.filtroForm.value.cantidad,
    });

    this.filtroForm.reset();
  }

  guardar(): void {
    this._alertaService.exito('La solicitud se guardo correctamente', '');
  }
}
