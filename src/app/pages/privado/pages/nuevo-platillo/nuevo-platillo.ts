import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstatusPlatillo } from '@core/models/estatusPlatillo.interface';
import { GrupoPlatillo } from '@core/models/grupoPlatillo.interface';
import { Ingrediente } from '@core/models/ingredientes.interface';
import { SubgrupoPlatillo } from '@core/models/subgrupoPlatillo.interface';
import { Uso } from '@core/models/uso.interface';
import { Variedad } from '@core/models/variedad.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-nuevo-platillo',
  imports: [ReactiveFormsModule,
    SelectModule,
    InputTextModule,ButtonModule],
  templateUrl: './nuevo-platillo.html',
  styleUrl: './nuevo-platillo.scss',
})
export class NuevoPlatillo {
 filtroForm!: FormGroup;
  ingredienteForm!: FormGroup;
    fb: FormBuilder = inject(FormBuilder);
    gruposPlatillo:GrupoPlatillo[] = [{ idGrupoPlatillo: 1, desGrupoPlatillo: 'Platillo principal' }, { idGrupoPlatillo: 2, desGrupoPlatillo: 'Ensaladas y entremeses' },
      { idGrupoPlatillo: 3, desGrupoPlatillo: 'Frutas' }, { idGrupoPlatillo: 4, desGrupoPlatillo: 'postres y dulces' }];
    subgruposPlatillo:SubgrupoPlatillo[] = [{ idSubgrupoPlatillo: 1, desSubgrupoPlatillo: 'Carne' }, { idSubgrupoPlatillo: 2, desSubgrupoPlatillo: 'Pescados' }];
    estatusPlatillo:EstatusPlatillo[] = [{ idEstatusPlatillo: 1, desEstatusPlatillo: 'Activo' }, { idEstatusPlatillo: 2, desEstatusPlatillo: 'Inactivo' }];
    listaVariedades:Variedad[] = [{ idVariedad: 1, desVariedad: 'Carne de res' }, { idVariedad: 2, desVariedad: 'Carne de cerdo' },
    { idVariedad: 3, desVariedad: 'Normal A' }, { idVariedad: 4, desVariedad: 'Normal B' }, { idVariedad: 5, desVariedad: 'Normal C' }];
    listaUsos:Uso[] = [{ idUso: 1, desUso: 'Para guisar plato fuerte' }, { idUso: 2, desUso: 'Para guisar salsa' }];
    ingredientes:Ingrediente[] = [{ idIngrediente: 1, desIngrediente: 'Carne de res' }, { idIngrediente: 2, desIngrediente: 'Carne de cerdo' },
    { idIngrediente: 3, desIngrediente: 'Pechuga de pollo' }, { idIngrediente: 4, desIngrediente: 'Pescado' }, { idIngrediente: 5, desIngrediente: 'Camarón' }];

     ingredientesFiltrados: Ingrediente[] = [];
      mostrarLista: boolean = false;
constructor() {
       this.filtroForm = this.fb.group({
        nombre: ['', Validators.required],
      grupo: [null, Validators.required],
      subgrupo: [null, Validators.required],
      estatus: [null, Validators.required],


    });
    this.ingredienteForm = this.fb.group({
      ingrediente: [null, Validators.required],
      variedad: [null, Validators.required],
      uso: [null, Validators.required],
    });

    this.ingredientesFiltrados = this.ingredientes;
  }
  regresar() {
    window.history.back(); 
   }

    /* =========================================================
     FILTRAR
     ========================================================= */

  filtrarIngredientes(): void {

    const texto = this.ingredienteForm
      .get('ingrediente')
      ?.value
      ?.toLowerCase()
      ?.trim();

    if (!texto) {

      this.ingredientesFiltrados =
        this.ingredientes;

      return;

    }

    this.ingredientesFiltrados =
      this.ingredientes.filter(
        ingrediente =>
          ingrediente.desIngrediente
            .toLowerCase()
            .includes(texto)
      );

  }

  /* =========================================================
     SELECCIONAR
     ========================================================= */

  seleccionarIngrediente(
    ingrediente: Ingrediente
  ): void {

    this.ingredienteForm.patchValue({

      ingrediente:
        ingrediente.desIngrediente

    });

    this.mostrarLista = false;

  }

}
