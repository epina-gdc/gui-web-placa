import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-modal-duplicar',
  imports: [ButtonModule],
  templateUrl: './modal-duplicar.html',
  styleUrl: './modal-duplicar.scss',
})
export class ModalDuplicar {
  protected _alertaService: AlertService = inject(AlertService);

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {}

  aceptar(): void {
    this.guardar();
    this.ref.close(true);
  }

  cancelar(): void {
    this.ref.close(false);
  }

  guardar(): void {
    this._alertaService.exito('El periodo se duplicó correctamente', '');
  }
}
