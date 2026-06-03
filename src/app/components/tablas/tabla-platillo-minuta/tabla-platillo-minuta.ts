import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnDefinition } from '@core/models/columna-tabla';
import { PlatilloMinuta } from '@core/models/platillo-minuta.interface';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-platillo-minuta',
  imports: [
    TableModule,
    PaginatorModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './tabla-platillo-minuta.html',
  styleUrl: './tabla-platillo-minuta.scss',
})
export class TablaPlatilloMinuta {
  @Input() data: PlatilloMinuta[] = [];

  first: WritableSignal<number> = signal(0);

  rows: WritableSignal<number> = signal(10);

  tituloTabla: string = 'Resultados de la búsqueda';

  unfrozenColumns: ColumnDefinition[] = [];

  totalWidth: any;
  columns: ColumnDefinition[] = [
    {
      field: 'platillo',
      header: 'Platillo',
      width: '80px',
    },
    {
      field: 'racion',
      header: 'Ración',
      width: '150px',
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
