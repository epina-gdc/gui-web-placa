import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalConfirmacion } from '@components/modal/modal-confirmacion/modal-confirmacion';
import { ModalRechazo } from '@components/modal/modal-rechazo/modal-rechazo';
import { ColumnDefinition } from '@core/models/columna-tabla';
import { Solicitud } from '@core/models/solicitud.interface';
import { NAV_PRIVADO_URL } from '@core/utils/url-global';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-tabla-solicitud',
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
  templateUrl: './tabla-solicitud.html',
  styleUrl: './tabla-solicitud.scss',
  standalone: true,
})
export class TablaSolicitud {
  protected _alertaService: AlertService = inject(AlertService);

  @Input() data: Solicitud[] = [];
  dataOrdenada: Solicitud[] = [];

  first: WritableSignal<number> = signal(0);

  rows: WritableSignal<number> = signal(10);

  tituloTabla: string = 'Resultados de la búsqueda';

  unfrozenColumns: ColumnDefinition[] = [];

  totalWidth: any;

  columns: ColumnDefinition[] = [
    {
      field: 'folio',
      header: 'Folio',
      width: '80px',
    },
    {
      field: 'fecha',
      header: 'Fecha de regsitro',
      width: '150px',
    },
    {
      field: 'estatus',
      header: 'Estatus',
      width: '200px',
    },
    {
      field: 'fechaActualizacion',
      header: 'Fecha de actualización',
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
    return this.dataOrdenada.length;
  }

  /* =========================================================
     CAMBIOS
     ========================================================= */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataOrdenada = [...this.data];
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

  nuevaSolicitud() {
    this._router.navigate(['/privado', NAV_PRIVADO_URL.nuevaSolicitudExtraordinaria]);
  }

  /* =========================================================
   SORT GLOBAL
   ========================================================= */

  customSort(event: any): void {
    const field = event.field;
    const order = event.order;

    this.dataOrdenada.sort((a: any, b: any) => {
      let value1 = a[field];
      let value2 = b[field];

      if (value1 == null && value2 != null) return -1 * order;
      if (value1 != null && value2 == null) return 1 * order;
      if (value1 == null && value2 == null) return 0;

      if (!isNaN(Date.parse(value1)) && !isNaN(Date.parse(value2))) {
        return (new Date(value1).getTime() - new Date(value2).getTime()) * order;
      }

      return (
        value1.toString().localeCompare(value2.toString(), 'es', { sensitivity: 'base' }) * order
      );
    });
  }

  get datosPaginados(): Solicitud[] {
    return this.dataOrdenada.slice(this.first(), this.first() + this.rows());
  }

  abrirModal(): void {
    const ref = this.dialogService.open(ModalConfirmacion, {
      header: 'Aprobar solicitud extraordinaria',
      width: '800px',
      modal: true,
      closable: true,
      showHeader: true,
      dismissableMask: false,
      draggable: false,
      data: {
        mensaje: 'Confirme la aprobación de la solicitud',
        textoBoton: 'Aprobar solicitud',
      },
    });

    ref?.onClose?.subscribe(() => {
      this.cambioEstatus();
    });
  }

  rechazar(): void {
    const ref = this.dialogService.open(ModalRechazo, {
      header: 'Rechazar solicitud extraordinaria',
      width: '800px',
      modal: true,
      closable: true,
      showHeader: true,
      draggable: false,
      dismissableMask: false,
      data: {
        mensaje: 'Rechazar solicitud',
        textoBoton: 'Rechazar solicitud',
      },
    });

    ref?.onClose?.subscribe(() => {
      this.cambioEstatus();
    });
  }

  cambioEstatus(): void {
    this._alertaService.exito('El estatus se actualizó correctamente', '');
  }

  verDetalles(solicitud: Solicitud): void {
    console.log('Detalles de la solicitud');
    console.log('Solicitud seleccionada:', solicitud);
    this._router.navigate([
      '/privado',
      NAV_PRIVADO_URL.solicitudExtraordinaria,
      solicitud.idSolicitud,
    ]);
  }
}


