import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EstatusPlatillo } from '@core/models/estatusPlatillo.interface';
import { GrupoPlatillo } from '@core/models/grupoPlatillo.interface';
import { SubgrupoPlatillo } from '@core/models/subgrupoPlatillo.interface';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-platillos',
  imports: [ ReactiveFormsModule,
    SelectModule,
    InputTextModule,ButtonModule],
  templateUrl: './platillos.html',
  styleUrl: './platillos.scss',
})
export class Platillos {

  filtroForm!: FormGroup;
    fb: FormBuilder = inject(FormBuilder);
    gruposPlatillo:GrupoPlatillo[] = [{ idGrupoPlatillo: 1, desGrupoPlatillo: 'Platillo principal' }, { idGrupoPlatillo: 2, desGrupoPlatillo: 'Ensaladas y entremeses' }, 
      { idGrupoPlatillo: 3, desGrupoPlatillo: 'Frutas' }, { idGrupoPlatillo: 4, desGrupoPlatillo: 'postres y dulces' }];
    subgruposPlatillo:SubgrupoPlatillo[] = [{ idSubgrupoPlatillo: 1, desSubgrupoPlatillo: 'Carne' }, { idSubgrupoPlatillo: 2, desSubgrupoPlatillo: 'Pescados' }];
    estatusPlatillo:EstatusPlatillo[] = [{ idEstatusPlatillo: 1, desEstatusPlatillo: 'Activo' }, { idEstatusPlatillo: 2, desEstatusPlatillo: 'Inactivo' }];
    constructor() {
       this.filtroForm = this.fb.group({
        nombreClave: [''],
      grupo: [null],
      subgrupo: [null],
      estatus: [null],


    });
    }
}
