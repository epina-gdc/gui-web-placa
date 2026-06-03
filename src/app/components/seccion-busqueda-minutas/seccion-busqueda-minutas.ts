import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalDuplicar } from '@components/modal/modal-duplicar/modal-duplicar';
import { TablaServicioMinuta } from '@components/tablas/tabla-servicio-minuta/tabla-servicio-minuta';
import { Minuta } from '@core/models/minuta.interface';
import { ServicioMinuta } from '@core/models/servicio-minuta.interface';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-seccion-busqueda-minutas',
  imports: [CommonModule, ButtonModule, TabsModule, TablaServicioMinuta,ModalDuplicar],
  templateUrl: './seccion-busqueda-minutas.html',
  styleUrl: './seccion-busqueda-minutas.scss',
})
export class SeccionBusquedaMinutas {
  @Input() tipoBusqueda: string = '';
  @Input() periodo: string = '';
  @Input() fecha: string = '';
  @Input() minuta: Minuta | null = null;
  tabSeleccionado = 'desayuno';

  desayuno: ServicioMinuta | null = null;
  comida: ServicioMinuta | null = null;
  cena: ServicioMinuta | null = null;
  colacion: ServicioMinuta | null = null;
  constructor(private dialogService: DialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minuta']) {
      this.cargarServicios();
    }
  }

  private cargarServicios(): void {
    this.desayuno =
      this.minuta?.servicios.find((x) => x.servicio.desServicio === 'Desayuno') ?? null;

    this.comida = this.minuta?.servicios.find((x) => x.servicio.desServicio === 'Comida') ?? null;

    this.cena = this.minuta?.servicios.find((x) => x.servicio.desServicio === 'Cena') ?? null;

    this.colacion =
      this.minuta?.servicios.find((x) => x.servicio.desServicio === 'Colación') ?? null;
  }

   abrirModal(): void {
      const ref = this.dialogService.open(ModalDuplicar, {
        header: 'Duplicar periodo',
        width: '800px',
        modal: true,
        closable: true,
        showHeader: true,
        dismissableMask: false
      });
    }
}
