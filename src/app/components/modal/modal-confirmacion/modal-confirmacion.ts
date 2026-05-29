import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  DynamicDialogConfig,
  DynamicDialogRef
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-confirmacion',
  imports: [ButtonModule],
  standalone: true,
  templateUrl: './modal-confirmacion.html',
  styleUrl: './modal-confirmacion.scss'
})
export class ModalConfirmacion {

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  get mensaje(): string {
    return this.config.data?.mensaje ?? '';
  }

  get textoBoton(): string {
    return this.config.data?.textoBoton ?? 'Aceptar';
  }

  aceptar(): void {
    this.ref.close(true);
  }

  cancelar(): void {
    this.ref.close(false);
  }
}