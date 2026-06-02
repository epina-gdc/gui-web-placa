import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeccionBusqueda } from '@components/seccion-busqueda/seccion-busqueda';
import { SeccionTitulos } from '@components/seccion-titulos/seccion-titulos';
import { TablaPlatilloMinuta } from '@components/tablas/tabla-platillo-minuta/tabla-platillo-minuta';
import { PlatilloMinuta } from '@core/models/platillo-minuta.interface';
import { Platillo } from '@core/models/platillo.interface';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-detalle-minuta',
  imports: [SeccionTitulos,SeccionBusqueda, ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,TablaPlatilloMinuta],
  templateUrl: './detalle-minuta.html',
  styleUrl: './detalle-minuta.scss',
})
export class DetalleMinuta {
  platilloForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  platillos:Platillo[]=[]
   platillosFiltrados: Platillo[] = [];
     mostrarLista: boolean = false;
  platilloSeleccionado = '';

platillosMinuta:PlatilloMinuta[] = [
  
]
  constructor() {

     this.platilloForm = this.fb.group({
      platillo: [null, Validators.required],
      platilloTexto: [''],
      racion: [null, Validators.required],
    });

     this.platillosFiltrados = [...this.platillos];


  }

  ngOnInit() {
    this.consultarPlatillos();
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


  /* =========================================================
       FILTRAR
       ========================================================= */
  
    filtrarplatillos(): void {
      const texto = this.platilloForm.get('platilloTexto')?.value?.toLowerCase()?.trim();
  
      if (!texto) {
        this.platillosFiltrados = [...this.platillos];
  
        return;
      }
  
      this.platillosFiltrados = this.platillos.filter((x) =>
        x.nombre.toLowerCase().includes(texto),
      );
    }
    /* =========================================================
       SELECCIONAR
       ========================================================= */
  
    seleccionarPlatillo(platillo: Platillo): void {
      this.platilloForm.patchValue({
        platillo: platillo,
        platilloTexto: platillo.nombre,
      });
  
      this.mostrarLista = false;
    }
    /* =========================================================
     AGREGAR INGREDIENTE
     ========================================================= */
  
    agregarPlatillo(): void {

  
      const platillo = this.platilloForm.value.platillo;
      const racion = this.platilloForm.value.racion;
  console.log('platillo:', platillo);
 
  
      const existe = this.platillosMinuta.some(
        (x) => x.platillo === platillo ,
      );
  
      if (existe) {
        return;
      }
  
      this.platillosMinuta.push({
        platillo: platillo.nombre,
        racion: racion,
      });
        
     console.log('platillosMinuta:', this.platillosMinuta);
      this.platilloForm.reset(); 
    }
}
