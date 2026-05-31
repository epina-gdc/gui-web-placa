import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnDefinition } from '@core/models/columna-tabla';
import { IngredientesPlatillo } from '@core/models/platillo-ingediente.interface';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-ingredientes',
  imports: [TableModule, PaginatorModule, CommonModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, Ripple,FormsModule,],
  templateUrl: './tabla-ingredientes.html',
  styleUrl: './tabla-ingredientes.scss',
})
export class TablaIngredientes {

  @Input() data: IngredientesPlatillo[] = [];

  first: WritableSignal<number> = signal(0);

  rows: WritableSignal<number> = signal(10);

  tituloTabla: string = 'Resultados de la búsqueda';

  unfrozenColumns: ColumnDefinition[] = [];

  totalWidth: any;

  columns: ColumnDefinition[] = [
    {
      field: 'ingrediente',
      header: 'Ingrediente',
      width: '80px'
    },
    {
      field: 'variedad',
      header: 'Variedad',
      width: '150px'
    },
    {
      field: 'uso',
      header: 'Uso',
      width: '200px'
    },
    {
      field: 'porcion',
      header: 'Porción',
      width: '200px'
    }
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

    if (
      this.first() + this.rows() < this.totalRecords
    ) {

      this.first.set(
        this.first() + this.rows()
      );

    }

  }

  /* =========================================================
     ANTERIOR
     ========================================================= */

  prev(): void {

    if (this.first() > 0) {

      this.first.set(
        this.first() - this.rows()
      );

    }

  }

  /* =========================================================
     PAGINA ACTUAL
     ========================================================= */

  currentPage(): number {

    return Math.floor(
      this.first() / this.rows()
    ) + 1;

  }

  /* =========================================================
     TOTAL PAGINAS
     ========================================================= */

  totalPagesArray(): number[] {

    const totalPages = Math.ceil(
      this.totalRecords / this.rows()
    );

    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    );

  }

  /* =========================================================
     IR A PAGINA
     ========================================================= */

  goToPage(page: number): void {

    this.first.set(
      (page - 1) * this.rows()
    );

  }
}
