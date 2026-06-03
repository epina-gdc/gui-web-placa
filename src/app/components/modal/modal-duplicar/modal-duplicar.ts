import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-duplicar',
  imports: [ButtonModule],
  templateUrl: './modal-duplicar.html',
  styleUrl: './modal-duplicar.scss',
})
export class ModalDuplicar {
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) {}

  aceptar(): void {
    this.ref.close(true);
  }

  cancelar(): void {
    this.ref.close(false);
  }
}
