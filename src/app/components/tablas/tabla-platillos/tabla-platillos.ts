import { Component, inject, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalConfirmacion } from '@components/modal/modal-confirmacion/modal-confirmacion';
import { AlertService } from '@core/services/alert.service';

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
    RouterLink,
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

  protected _alertaService: AlertService = inject(AlertService);

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
  protected _router: Router;

  constructor(private dialogService: DialogService) {
    this._router = inject(Router);
  }
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

  nuevoPlatillo() {
    void this._router.navigate(['/privado', NAV_PRIVADO_URL.nuevoPlatillo]);
  }

  eliminarPlatillo(): void {
    const ref = this.dialogService.open(ModalConfirmacion, {
      header: 'Eliminar platillo',
      width: '800px',
      height: '300px',
      draggable: false,
      modal: true,
      closable: true,
      showHeader: true,
      dismissableMask: false,
      data: {
        mensaje: 'Confirme que desea eliminar este platillo. Esta acción no se puede deshacer',
        textoBoton: 'Sí, confirmar',
      },
    });

    ref?.onClose?.subscribe(() => {
      this.mostrarMensajeEliminar();
    });
  }

  mostrarMensajeEliminar(): void {
    this._alertaService.exito('Platillo eliminado', '');
  }
}
