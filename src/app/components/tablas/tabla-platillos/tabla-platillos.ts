import { Component, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Platillo } from '@core/models/platillo.interface';
import { ColumnDefinition } from '@core/models/columna-tabla';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tabla-platillos',
  imports: [
    TableModule,
    PaginatorModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    FormsModule,
  ],
  templateUrl: './tabla-platillos.html',
  styleUrl: './tabla-platillos.scss',
  standalone: true,
})
export class TablaPlatillos {
  @Input() data: Platillo[] = [];

  first: WritableSignal<number> = signal(0);

  rows: WritableSignal<number> = signal(10);

  tituloTabla: string = 'Resultados de la búsqueda';

  unfrozenColumns: ColumnDefinition[] = [];

  totalWidth: any;

  columns: ColumnDefinition[] = [
    {
      field: 'clave',
      header: 'Clave',
      width: '80px',
    },
    {
      field: 'nombre',
      header: 'Nombre del platillo',
      width: '150px',
    },
    {
      field: 'grupo',
      header: 'Grupo',
      width: '200px',
    },
    {
      field: 'subgrupo',
      header: 'Subgrupo',
      width: '200px',
    },
    {
      field: 'fechaRegistro',
      header: 'Fecha de registro',
      width: '200px',
    },
  ];

  /* =========================================================
     TOTAL RECORDS
     ========================================================= */

  get totalRecords(): number {
    return this.data.length;
  }

  /* =========================================================
     CAMBIOS
     ========================================================= */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
    }
  }

  /* =========================================================
     PAGINADOR
     ========================================================= */

  onPageChange(event: any): void {
    this.first.set(event.first ?? 0);

    this.rows.set(event.rows ?? 10);
  }

  /* =========================================================
     BUSQUEDA
     ========================================================= */

  buscar(busqueda: any): string {
    return busqueda.target.value;
  }

  /* =========================================================
     SIGUIENTE
     ========================================================= */

  next(): void {
    if (this.first() + this.rows() < this.totalRecords) {
      this.first.set(this.first() + this.rows());
    }
  }

  /* =========================================================
     ANTERIOR
     ========================================================= */

  prev(): void {
    if (this.first() > 0) {
      this.first.set(this.first() - this.rows());
    }
  }

  /* =========================================================
     PAGINA ACTUAL
     ========================================================= */

  currentPage(): number {
    return Math.floor(this.first() / this.rows()) + 1;
  }

  /* =========================================================
     TOTAL PAGINAS
     ========================================================= */

  totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalRecords / this.rows());

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  /* =========================================================
     IR A PAGINA
     ========================================================= */

  goToPage(page: number): void {
    this.first.set((page - 1) * this.rows());
  }
}
