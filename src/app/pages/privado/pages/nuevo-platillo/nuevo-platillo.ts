import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TablaIngredientes } from '@components/tablas/tabla-ingredientes/tabla-ingredientes';
import { EstatusPlatillo } from '@core/models/estatusPlatillo.interface';
import { GrupoPlatillo } from '@core/models/grupoPlatillo.interface';
import { Ingrediente } from '@core/models/ingredientes.interface';
import { IngredientesPlatillo } from '@core/models/platillo-ingediente.interface';
import { SubgrupoPlatillo } from '@core/models/subgrupoPlatillo.interface';
import { Uso } from '@core/models/uso.interface';
import { Variedad } from '@core/models/variedad.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { take } from 'rxjs';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';

@Component({
  selector: 'app-nuevo-platillo',
  imports: [
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    TablaIngredientes,
    SeccionTitulos,
    SeccionBusqueda,
  ],
  templateUrl: './nuevo-platillo.html',
  styleUrl: './nuevo-platillo.scss',
})
export class NuevoPlatillo {
  filtroForm!: FormGroup;
  ingredienteForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  gruposPlatillo: GrupoPlatillo[] = [
    { idGrupoPlatillo: 1, desGrupoPlatillo: 'Platillo principal' },
    { idGrupoPlatillo: 2, desGrupoPlatillo: 'Ensaladas y entremeses' },
    { idGrupoPlatillo: 3, desGrupoPlatillo: 'Frutas' },
    { idGrupoPlatillo: 4, desGrupoPlatillo: 'postres y dulces' },
  ];
  subgruposPlatillo: SubgrupoPlatillo[] = [
    { idSubgrupoPlatillo: 1, desSubgrupoPlatillo: 'Carne' },
    { idSubgrupoPlatillo: 2, desSubgrupoPlatillo: 'Pescados' },
  ];
  estatusPlatillo: EstatusPlatillo[] = [
    { idEstatusPlatillo: 1, desEstatusPlatillo: 'Activo' },
    { idEstatusPlatillo: 2, desEstatusPlatillo: 'Inactivo' },
  ];
  listaVariedades: Variedad[] = [
    { idVariedad: 1, desVariedad: 'Carne de res' },
    { idVariedad: 2, desVariedad: 'Carne de cerdo' },
    { idVariedad: 3, desVariedad: 'Normal A' },
    { idVariedad: 4, desVariedad: 'Normal B' },
    { idVariedad: 5, desVariedad: 'Normal C' },
  ];
  listaUsos: Uso[] = [
    { idUso: 1, desUso: 'Para guisar plato fuerte' },
    { idUso: 2, desUso: 'Para guisar salsa' },
  ];
  ingredientes: Ingrediente[] = [
    { idIngrediente: 1, desIngrediente: 'Carne de res' },
    { idIngrediente: 2, desIngrediente: 'Carne de cerdo' },
    { idIngrediente: 3, desIngrediente: 'Pechuga de pollo' },
    { idIngrediente: 4, desIngrediente: 'Pescado' },
    { idIngrediente: 5, desIngrediente: 'Camarón' },
  ];

  ingredientesFiltrados: Ingrediente[] = [];
  mostrarLista: boolean = false;
  ingredientesPlatillo: IngredientesPlatillo[] = [];
  ingredienteSeleccionado = '';

  constructor() {
    this.filtroForm = this.fb.group({
      nombre: ['', Validators.required],
      grupo: [null, Validators.required],
      subgrupo: [null, Validators.required],
      estatus: [null, Validators.required],
    });
    this.ingredienteForm = this.fb.group({
      ingrediente: [null, Validators.required], // objeto seleccionado
      ingredienteTexto: [''],
      variedad: [null, Validators.required],
      uso: [null, Validators.required],
    });

    this.ingredientesFiltrados = this.ingredientes;
    this.insertarDummiesIngredientes();
  }
  regresar() {
    window.history.back();
  }

  /* =========================================================
     FILTRAR
     ========================================================= */

  filtrarIngredientes(): void {
    const texto = this.ingredienteForm.get('ingredienteTexto')?.value?.toLowerCase()?.trim();

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
    this.ingredienteForm.patchValue({
      ingrediente: ingrediente,
      ingredienteTexto: ingrediente.desIngrediente,
    });

    this.mostrarLista = false;
  }
  /* =========================================================
   AGREGAR INGREDIENTE
   ========================================================= */

  agregarIngrediente(): void {
    const idIngrediente = this.ingredienteForm.value.ingrediente;

    const idVariedad = this.ingredienteForm.value.variedad;

    const idUso = this.ingredienteForm.value.uso;

    const ingrediente = this.ingredienteForm.value.ingrediente;

    ingrediente.idIngrediente;
    ingrediente.desIngrediente;

    const variedad = this.listaVariedades.find((x) => x.idVariedad === idVariedad);

    const uso = this.listaUsos.find((x) => x.idUso === idUso);

    if (!ingrediente || !variedad || !uso) {
      return;
    }

    const existe = this.ingredientesPlatillo.some(
      (x) => x.idIngrediente === idIngrediente && x.idVariedad === idVariedad && x.idUso === idUso,
    );

    if (existe) {
      return;
    }

    this.ingredientesPlatillo.push({
      idIngrediente: ingrediente.idIngrediente,
      ingrediente: ingrediente.desIngrediente,

      idVariedad: variedad.idVariedad,
      variedad: variedad.desVariedad,

      idUso: uso.idUso,
      uso: uso.desUso,

      porcion: 0.25,
    });

    console.log(this.ingredientesPlatillo);

    this.ingredienteForm.reset();
  }

  insertarDummiesIngredientes(): void {
    this.ingredientesPlatillo = [
      {
        idIngrediente: 1,
        ingrediente: 'Aceite de cartamo',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.18,
      },
      {
        idIngrediente: 2,
        ingrediente: 'Ajo en bulbo',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 2,
        uso: 'Para guisar salsa',
        porcion: 0.24,
      },
      {
        idIngrediente: 3,
        ingrediente: 'Cebolla blanca',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 2,
        uso: 'Para guisar salsa',
        porcion: 0.56,
      },
      {
        idIngrediente: 4,
        ingrediente: 'Chile seco chipotle',
        idVariedad: 2,
        variedad: 'Normal B',
        idUso: 2,
        uso: 'Para guisar salsa',
        porcion: 0.89,
      },
      {
        idIngrediente: 5,
        ingrediente: 'Consome pollo desh. polvo',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.13,
      },
      {
        idIngrediente: 6,
        ingrediente: 'Crema entera leche de vaca',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.77,
      },
      {
        idIngrediente: 7,
        ingrediente: 'Harina de trigo',
        idVariedad: 1,
        variedad: 'Normal A',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.45,
      },
      {
        idIngrediente: 8,
        ingrediente: 'Margarina sin sal',
        idVariedad: 2,
        variedad: 'Normal B',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.32,
      },
      {
        idIngrediente: 9,
        ingrediente: 'Pierna cerdo entera, sin hueso',
        idVariedad: 2,
        variedad: 'Normal B',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.91,
      },
      {
        idIngrediente: 10,
        ingrediente: 'Sal refinada yodatada',
        idVariedad: 2,
        variedad: 'Normal B',
        idUso: 1,
        uso: 'Para guisar plato fuerte',
        porcion: 0.68,
      },
    ];
  }
}
