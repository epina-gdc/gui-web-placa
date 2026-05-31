import { Component, inject } from '@angular/core';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { Button, ButtonDirective } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';
import { Select } from 'primeng/select';
import { TablaNuevosIngredientes } from '@components/tablas/tabla-nuevos-ingredientes/tabla-nuevos-ingredientes';
import { GrupoPlatillo } from '@core/models/grupoPlatillo.interface';
import { SubgrupoPlatillo } from '@core/models/subgrupoPlatillo.interface';
import { EstatusPlatillo } from '@core/models/estatusPlatillo.interface';
import { Variedad } from '@core/models/variedad.interface';
import { Uso } from '@core/models/uso.interface';
import { Ingrediente } from '@core/models/ingredientes.interface';
import { IngredientesPlatillo } from '@core/models/platillo-ingediente.interface';

@Component({
  selector: 'app-detalle-platillo',
  imports: [
    SeccionTitulos,
    Button,
    ButtonDirective,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    SeccionBusqueda,
    Select,
    TablaNuevosIngredientes,
  ],
  templateUrl: './detalle-platillo.html',
  styleUrl: './detalle-platillo.scss',
})
export class DetallePlatillo {
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

  insertarDummiesIngredientes(): void {}
}
