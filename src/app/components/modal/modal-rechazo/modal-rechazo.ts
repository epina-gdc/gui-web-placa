import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Motivo } from '@core/models/motivo.interface';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-modal-rechazo',
  imports: [ButtonModule,ReactiveFormsModule,
    SelectModule],
  templateUrl: './modal-rechazo.html',
  styleUrl: './modal-rechazo.scss',
})
export class ModalRechazo {
  motivos:Motivo[]=[{idMotivo: 1, descripcion: 'Ingredientes Incorrectos'},{idMotivo: 2, descripcion: 'Falta de Ingredientes'}
    ,{idMotivo: 3, descripcion: 'Otros'}];
 filtroForm!: FormGroup;
fb: FormBuilder = inject(FormBuilder);
   constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {

    this.filtroForm = this.fb.group({

    motivo: [null, Validators.required]
  });
  }

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
