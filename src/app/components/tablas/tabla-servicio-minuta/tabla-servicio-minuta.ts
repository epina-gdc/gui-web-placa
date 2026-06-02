import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnDefinition } from '@core/models/columna-tabla';
import { ServicioMinuta } from '@core/models/servicio-minuta.interface';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-servicio-minuta',
  imports: [FormsModule, CheckboxModule, InputTextModule, TableModule, CommonModule],
  templateUrl: './tabla-servicio-minuta.html',
  styleUrl: './tabla-servicio-minuta.scss',
})
export class TablaServicioMinuta {
  @Input() servicioMinuta: ServicioMinuta = null!;

  selectedRows: any[] = [];

  first: WritableSignal<number> = signal(0);

  rows: WritableSignal<number> = signal(10);

  tituloTabla: string = 'Resultados de la búsqueda';

  unfrozenColumns: ColumnDefinition[] = [];

  totalWidth: any;

  columns: ColumnDefinition[] = [
    {
      field: 'desVariedad',
      header: 'Variedad',
      width: '80px',
    },
    {
      field: 'racion',
      header: 'Raciónes',
      width: '150px',
    },
  ];
  constructor(private _router: Router) {}

  estaSeleccionado(row: any): boolean {
    return this.selectedRows.some((x) => x.idVariedad === row.idVariedad);
  }
  toggleFila(row: any, checked: boolean): void {
    if (checked) {
      if (!this.estaSeleccionado(row)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter((x) => x.idVariedad !== row.idVariedad);
    }
  }
  todosSeleccionados(): boolean {
    return (
      this.servicioMinuta.variedad.length > 0 &&
      this.selectedRows.length === this.servicioMinuta.variedad.length
    );
  }

  toggleTodos(checked: boolean): void {
    if (checked) {
      this.selectedRows = [...this.servicioMinuta.variedad];
    } else {
      this.selectedRows = [];
    }
  }

  /* =========================================================
     TOTAL RECORDS
     ========================================================= */

  get totalRecords(): number {
    return this.servicioMinuta.variedad.length;
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

  verDetalles(variedad: any): void {
     
      this._router.navigate([
        '/privado',
        NAV_PRIVADO_URL.detalleMinuta,1,2,
        
      ]);
    }
}
