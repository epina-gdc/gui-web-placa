import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EstatusPlatillo } from '@core/models/estatusPlatillo.interface';
import { GrupoPlatillo } from '@core/models/grupoPlatillo.interface';
import { SubgrupoPlatillo } from '@core/models/subgrupoPlatillo.interface';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Platillo } from '@core/models/platillo.interface';
import { TablaPlatillos } from '@components/tablas/tabla-platillos/tabla-platillos';

@Component({
  selector: 'app-platillos',
  imports: [ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule, TablaPlatillos],
  templateUrl: './platillos.html',
  styleUrl: './platillos.scss',
})
export class Platillos {
  filtroForm!: FormGroup;
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
  platillos: Platillo[] = [];
  constructor() {
    this.filtroForm = this.fb.group({
      nombreClave: [''],
      grupo: [null],
      subgrupo: [null],
      estatus: [null],
    });
  }
  consultarPlatillos() {
    // Aquí iría la lógica para consultar los platillos según los filtros seleccionados

    this.platillos = [
      {
        clave: '001',
        nombre: 'Tacos de carne asada',
        grupo: 'Platillo principal',
        subgrupo: 'Carne',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-01-15'),
      },
      {
        clave: '002',
        nombre: 'Ensalada César',
        grupo: 'Ensaladas y entremeses',
        subgrupo: 'Ensaladas',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-02-20'),
      },
      {
        clave: '003',
        nombre: 'Fruta fresca con chile',
        grupo: 'Frutas',
        subgrupo: 'Frutas',
        estatus: 'Inactivo',
        fechaRegistro: new Date('2023-03-10'),
      },
      {
        clave: '004',
        nombre: 'Pastel de chocolate',
        grupo: 'postres y dulces',
        subgrupo: 'postres y dulces',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-04-05'),
      },
      {
        clave: '005',
        nombre: 'Pescado a la veracruzana',
        grupo: 'Platillo principal',
        subgrupo: 'Pescados',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-05-12'),
      },
      {
        clave: '006',
        nombre: 'Ensalada de nopales',
        grupo: 'Ensaladas y entremeses',
        subgrupo: 'Ensaladas',
        estatus: 'Inactivo',
        fechaRegistro: new Date('2023-06-18'),
      },
      {
        clave: '007',
        nombre: 'Fruta con yogurt',
        grupo: 'Frutas',
        subgrupo: 'Frutas',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-07-22'),
      },
      {
        clave: '008',
        nombre: 'Gelatina de mosaico',
        grupo: 'postres y dulces',
        subgrupo: 'postres y dulces',
        estatus: 'Inactivo',
        fechaRegistro: new Date('2023-08-30'),
      },
      {
        clave: '009',
        nombre: 'Tacos de pescado',
        grupo: 'Platillo principal',
        subgrupo: 'Pescados',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-09-14'),
      },
      {
        clave: '010',
        nombre: 'Ensalada de frutas',
        grupo: 'Ensaladas y entremeses',
        subgrupo: 'Ensaladas',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-10-01'),
      },
      {
        clave: '011',
        nombre: 'Fruta con chile y limón',
        grupo: 'Frutas',
        subgrupo: 'Frutas',
        estatus: 'Inactivo',
        fechaRegistro: new Date('2023-11-05'),
      },
      {
        clave: '012',
        nombre: 'Flan de vainilla',
        grupo: 'postres y dulces',
        subgrupo: 'postres y dulces',
        estatus: 'Activo',
        fechaRegistro: new Date('2023-12-20'),
      },
    ];
  }
}
